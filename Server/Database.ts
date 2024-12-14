import sqlite3 from 'sqlite3';
import { GearInstance } from './Entities/Items/GearInstance/GearInstance';
import { GearType } from './Utility/Enum/EquipmentTypes';

export class DB {
    private db: sqlite3.Database;

    constructor() {
        this.db = this.connect();
    }

    private connect(): sqlite3.Database {
        const db = new sqlite3.Database('database.sqlite', (err) => {
            if (err) {
                console.error('Error opening database', err.message);
            } else {
                console.log('Connected to the SQLite database.');
            }
        });
        return db;
    }

    // Method to check if a table exists in the database
    async tableExists(tableName: string): Promise<boolean> {
       const sql = `SELECT name FROM sqlite_master WHERE type='table' AND name=?`;
        return new Promise((resolve, reject) => {
            this.db.get(sql, [tableName], (err, row) => {
                if (err) {
                    console.error(`Error checking if table exists: ${err.message}`);
                    reject(err);
                } else {
                    resolve(!!row); // Return true if the table exists, false otherwise
                }
            });
        });
    }

    async createTable(tableName: string, schema: string): Promise<void> {
        const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${schema})`;
        this.db.run(sql, (err) => {
            if (err) {
                console.error(`Error creating table ${tableName}`, err.message);
            } else {
                console.log(`Table ${tableName} created or already exists.`);
            }
        });
    }

    async writeNew(
        { 
            tableName, 
            primaryKeyColumnName, 
            primaryKeyValue 
        }: { 
            tableName: string, 
            primaryKeyColumnName: string, 
            primaryKeyValue: string 
        },
        data: { 
            dataKey: string, 
            value: any 
        }[]
    ): Promise<void> {
        // Extract the data keys (column names) and values for insertion
        const columns = data.map(d => d.dataKey).join(', ');
        const placeholders = data.map(() => '?').join(', ');
        const values = data.map(d => d.value);
    
        // Construct the SQL query for inserting a new row
        const sql = `INSERT INTO ${tableName} (${primaryKeyColumnName}, ${columns}) VALUES (?, ${placeholders})`;
        const params = [primaryKeyValue, ...values]; // The primary key value comes first, followed by the rest of the values
    
        return new Promise((resolve, reject) => {
            // Execute the SQL query to insert a new row
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.error('Error inserting data into database', err.message);
                    reject(err);
                } else {
                    console.log(`Inserted row into ${tableName} with id ${primaryKeyValue}`);
                    resolve();
                }
            });
        });
    }
    
    async writeOver(
        { tableName, primaryKeyColumnName, primaryKeyValue }: { tableName: string, primaryKeyColumnName: string, primaryKeyValue: string },
        data: { dataKey: string, value: any }[]
    ): Promise<void> {
        // Construct the SQL check query to see if the row exists
        const sqlCheck = `SELECT COUNT(*) as count FROM ${tableName} WHERE ${primaryKeyColumnName} = ?`;
        
        // Dynamically create the UPDATE and INSERT SQL based on the provided data keys
        const setClause = data.map(d => `${d.dataKey} = ?`).join(', ');
        const updateSQL = `UPDATE ${tableName} SET ${setClause} WHERE ${primaryKeyColumnName} = ?`;
        
        const columns = data.map(d => d.dataKey).join(', ');
        const placeholders = data.map(() => '?').join(', ');
        const insertSQL = `INSERT INTO ${tableName} (${primaryKeyColumnName}, ${columns}) VALUES (?, ${placeholders})`;
    
        // Extract the values for the update and insert queries
        const values = data.map(d => d.value);
        
        return new Promise((resolve, reject) => {
            // First, check if the row exists
            this.db.get(sqlCheck, [primaryKeyValue], (err, row) => {
                if (err) {
                    console.error('Error checking data in database', err.message);
                    reject(err);
                } else {
                    const count = (row as { count: number }).count;
                    const params = [...values, primaryKeyValue]; // Append the primary key value at the end for the WHERE clause
                    const sql = count > 0 ? updateSQL : insertSQL;
                    const insertParams = [primaryKeyValue, ...values]; // Insert needs the primary key first
    
                    // Choose between UPDATE or INSERT
                    this.db.run(count > 0 ? sql : insertSQL, count > 0 ? params : insertParams, function (err) {
                        if (err) {
                            console.error('Error writing data to database', err.message);
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    }
    
    async read<T>(tableName: string, primaryKey: string, primaryKeyValue: any): Promise<T | null> {
        const sql = `SELECT * FROM ${tableName} WHERE ${primaryKey} = ?`;
        const params = [primaryKeyValue];
    
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) {
                    console.error(`Error running query on table "${tableName}" with ${primaryKey} = ${primaryKeyValue}: ${err.message}`);
                    reject(new Error(`Database query error: ${err.message}`));
                } else if (!row) {
                    return resolve(null);
                } else {
                    resolve(row as T);
                }
            });
        });
    }

    async readAll(tableName: string): Promise<any[]> {
        const sql = `SELECT * FROM ${tableName}`;
    
        return new Promise((resolve, reject) => {
            this.db.all(sql, (err, rows) => {
                if (err) {
                    console.error('Error running query', err.message);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    circularReplacer() {
        const seen = new WeakSet();
        return function(key: string, value: any) {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return undefined;
                }
                seen.add(value);
            }
            return value;
        };
    }

    //MARK: Equipments
    async getWeapon(weapon: string): Promise<GearInstance> {
        const weaponObj = await this.read<{ 
            defenseStats?: string; 
            attackStats?: string; 
            slottedJewels?: string; 
            [key: string]: any 
        }>('Gears', 'id', weapon);
        if (weaponObj) {
            // Parse JSON fields that are stored as TEXT
            const defenseStats = weaponObj.defenseStats ? JSON.parse(weaponObj.defenseStats) : undefined;
            const attackStats = weaponObj.attackStats ? JSON.parse(weaponObj.attackStats) : undefined;
            const slottedJewels = weaponObj.slottedJewels ? JSON.parse(weaponObj.slottedJewels) : [];
    
            // Instantiate and return a GearInstance object
            return new GearInstance({
                id: weaponObj.id,
                name: weaponObj.name,
                crafter: weaponObj.crafter,
                description: weaponObj.description,
                image: weaponObj.image,
                cost: weaponObj.cost,
                weight: weaponObj.weight,
                tier: weaponObj.tier,
                gearType: GearType.weapon,
                specificType: weaponObj.specificType,
                jewelSlots: weaponObj.jewelSlots,
                maxJewelGrade: weaponObj.maxJewelGrade,
                defenseStats,
                attackStats,
                material: weaponObj.material,
                spellCastingDamageMultiplier: weaponObj.spellCastingDamageMultiplier,
                spellCastingPenaltyHit: weaponObj.spellCastingPenaltyHit,
                arcaneAptitude: weaponObj.arcaneAptitude,
                specialTrait: weaponObj.specialTrait ? JSON.parse(weaponObj.specialTrait) : [],
                class: weaponObj.class,
            });
        } else {
            throw new Error(`Weapon ${weapon} not found in database`);
        }
    }
    
    async getArmor(armor: string): Promise<GearInstance> {
        const armorObj = await this.read<{ 
            defenseStats?: string; 
            slottedJewels?: string; 
            [key: string]: any 
        }>('Gears', 'id', armor);
        if (armorObj) {
            // Parse JSON fields that are stored as TEXT
            const defenseStats = armorObj.defenseStats ? JSON.parse(armorObj.defenseStats) : undefined;
            const slottedJewels = armorObj.slottedJewels ? JSON.parse(armorObj.slottedJewels) : [];
    
            // Instantiate and return a GearInstance object
            return new GearInstance({
                id: armorObj.id,
                name: armorObj.name,
                crafter: armorObj.crafter,
                description: armorObj.description,
                image: armorObj.image,
                cost: armorObj.cost,
                weight: armorObj.weight,
                tier: armorObj.tier,
                gearType: GearType.armor,
                specificType: armorObj.specificType,
                jewelSlots: armorObj.jewelSlots,
                maxJewelGrade: armorObj.maxJewelGrade,
                defenseStats,
                material: armorObj.material,
                spellCastingDamageMultiplier: armorObj.spellCastingDamageMultiplier,
                spellCastingPenaltyHit: armorObj.spellCastingPenaltyHit,
                arcaneAptitude: armorObj.arcaneAptitude,
                specialTrait: armorObj.specialTrait ? JSON.parse(armorObj.specialTrait) : [],
                class: armorObj.class,
            });
        } else {
            throw new Error(`Armor ${armor} not found in database`);
        }
    }

    async getAccessory(accessory: string): Promise<any> {
        const accessoryObj = await this.read('Gears', 'id', accessory);
        if (accessoryObj) {
            return accessoryObj
        } else {
            throw new Error(`Accessory ${accessory} not found in database`);
        }
    }

    async getResource(resource: string): Promise<any> {
        const resourceObj = await this.read('ItemResources', 'id', resource);
        if (resourceObj) {
            return resourceObj
        } else {
            throw new Error(`Resource ${resource} not found in database`);
        }
    }

    //MARK: Internals
    async getInternal(internal: string): Promise<any> {
        const internalObj = await this.read('internals', 'id', internal);
        if (internalObj) {
            return internalObj
        } else {
            throw new Error(`Internal ${internal} not found in database`);
        }
    }

    //MARK: Skills
    async getSkill(skill: string): Promise<any> {
        const skillObj = await this.read('skills', 'id', skill);
        if (skillObj) {
            return skillObj
        } else {
            throw new Error(`Skill ${skill} not found in database`);
        }
    }

    async getCharacter(characterID: string): Promise<any> {
        const characterObj = await this.read('Character', 'id', characterID);
        if (characterObj) {
            return characterObj
        } else {
            throw new Error(`Character ${characterID} not found in database`)
        }
    }

}

export const db = new DB();
