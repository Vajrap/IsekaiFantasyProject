var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import sqlite3 from 'sqlite3';
import { Weapon } from './Entities/Items/Equipments/Weapon/Weapon';
import { Armor } from './Entities/Items/Equipments/Armors/Armor';
export class DB {
    constructor() {
        this.db = this.connect();
    }
    connect() {
        const db = new sqlite3.Database('database.sqlite', (err) => {
            if (err) {
                console.error('Error opening database', err.message);
            }
            else {
                console.log('Connected to the SQLite database.');
            }
        });
        return db;
    }
    // Ensure JSON.stringify for object values, but keep primitives as-is
    serializeValue(value) {
        if (typeof value === "object" && value !== null) {
            return JSON.stringify(value);
        }
        return value;
    }
    // Parse JSON strings back to objects
    deserializeRow(row) {
        if (!row)
            return null;
        const parsedRow = {};
        for (const key in row) {
            if (typeof row[key] === "string" && (row[key].trim().startsWith("{") || row[key].trim().startsWith("["))) {
                try {
                    parsedRow[key] = JSON.parse(row[key]);
                }
                catch (_a) {
                    parsedRow[key] = row[key];
                }
            }
            else {
                parsedRow[key] = row[key];
            }
        }
        return parsedRow;
    }
    // Method to check if a table exists in the database
    tableExists(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT name FROM sqlite_master WHERE type='table' AND name=?`;
            return new Promise((resolve, reject) => {
                this.db.get(sql, [tableName], (err, row) => {
                    if (err) {
                        console.error(`Error checking if table exists: ${err.message}`);
                        reject(err);
                    }
                    else {
                        resolve(!!row); // Return true if the table exists, false otherwise
                    }
                });
            });
        });
    }
    // Create table
    createTable(tableName, schema) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${schema})`;
            return new Promise((resolve, reject) => {
                this.db.run(sql, (err) => {
                    if (err) {
                        console.error(`Error creating table "${tableName}": ${err.message}`);
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    writeNew(_a, data_1) {
        return __awaiter(this, arguments, void 0, function* ({ tableName, primaryKeyColumnName, primaryKeyValue }, data) {
            // Extract the data keys (column names) and values for insertion
            const columns = data.map(d => d.dataKey).join(', ');
            const placeholders = data.map(() => '?').join(', ');
            const values = data.map((d) => this.serializeValue(d.value));
            // Construct the SQL query for inserting a new row
            const sql = `INSERT INTO ${tableName} (${primaryKeyColumnName}, ${columns}) VALUES (?, ${placeholders})`;
            const params = [primaryKeyValue, ...values]; // The primary key value comes first, followed by the rest of the values
            return new Promise((resolve, reject) => {
                // Execute the SQL query to insert a new row
                this.db.run(sql, params, function (err) {
                    if (err) {
                        console.error('Error inserting data into database', err.message);
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    writeOver(_a, data_1) {
        return __awaiter(this, arguments, void 0, function* ({ tableName, primaryKeyColumnName, primaryKeyValue }, data) {
            // Dynamically create the UPDATE and INSERT SQL based on the provided data keys
            const setClause = data.map(d => `${d.dataKey} = ?`).join(', ');
            const updateSQL = `UPDATE ${tableName} SET ${setClause} WHERE ${primaryKeyColumnName} = ?`;
            const columns = data.map(d => d.dataKey).join(', ');
            const placeholders = data.map(() => '?').join(', ');
            const insertSQL = `INSERT INTO ${tableName} (${primaryKeyColumnName}, ${columns}) VALUES (?, ${placeholders})`;
            // Extract the values for the update and insert queries
            const values = data.map((d) => this.serializeValue(d.value));
            // Construct the SQL check query to see if the row exists
            const sqlCheck = `SELECT COUNT(*) as count FROM ${tableName} WHERE ${primaryKeyColumnName} = ?`;
            return new Promise((resolve, reject) => {
                // First, check if the row exists
                this.db.get(sqlCheck, [primaryKeyValue], (err, row) => {
                    if (err) {
                        console.error('Error checking data in database', err.message);
                        reject(err);
                    }
                    else {
                        const count = row.count;
                        const params = [...values, primaryKeyValue]; // Append the primary key value at the end for the WHERE clause
                        const sql = count > 0 ? updateSQL : insertSQL;
                        const insertParams = [primaryKeyValue, ...values]; // Insert needs the primary key first
                        // Choose between UPDATE or INSERT
                        this.db.run(count > 0 ? sql : insertSQL, count > 0 ? params : insertParams, function (err) {
                            if (err) {
                                console.error('Error writing data to database', err.message);
                                reject(err);
                            }
                            else {
                                resolve();
                            }
                        });
                    }
                });
            });
        });
    }
    read(tableName, primaryKey, primaryKeyValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM ${tableName} WHERE ${primaryKey} = ?`;
            const params = [primaryKeyValue];
            return new Promise((resolve, reject) => {
                this.db.get(sql, params, (err, row) => {
                    if (err) {
                        console.error(`Error running query on table "${tableName}" with ${primaryKey} = ${primaryKeyValue}: ${err.message}`);
                        reject(new Error(`Database query error: ${err.message}`));
                    }
                    else if (!row) {
                        return resolve(null);
                    }
                    else {
                        resolve(this.deserializeRow(row));
                    }
                });
            });
        });
    }
    readAll(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM ${tableName}`;
            return new Promise((resolve, reject) => {
                this.db.all(sql, (err, rows) => {
                    if (err) {
                        console.error('Error running query', err.message);
                        reject(err);
                    }
                    else {
                        resolve(rows.map((row) => this.deserializeRow(row)));
                    }
                });
            });
        });
    }
    circularReplacer() {
        const seen = new WeakSet();
        return function (key, value) {
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
    getWeapon(weapon) {
        return __awaiter(this, void 0, void 0, function* () {
            const weaponObj = yield this.read('Gears', 'id', weapon);
            if (weaponObj) {
                // Instantiate and return a GearInstance object
                return new Weapon({
                    id: weaponObj.id,
                    name: weaponObj.name,
                    description: weaponObj.description,
                    image: weaponObj.image,
                    cost: weaponObj.cost,
                    weight: weaponObj.weight,
                    tier: weaponObj.tier,
                    jewelSlots: weaponObj.jewelSlots,
                    slottedJewels: weaponObj.slottedJewels,
                    maxJewelGrade: weaponObj.maxJewelGrade,
                    material: weaponObj.material,
                    specialTrait: weaponObj.specialTrait,
                    attackStats: weaponObj.attackStats,
                    defenseStats: weaponObj.defenseStats,
                    weaponType: weaponObj.weaponType,
                    weaponSpecificType: weaponObj.weaponSpecificType,
                });
            }
            else {
                throw new Error(`Weapon ${weapon} not found in database`);
            }
        });
    }
    getArmor(armor) {
        return __awaiter(this, void 0, void 0, function* () {
            const armorObj = yield this.read('Gears', 'id', armor);
            if (armorObj) {
                // Instantiate and return a GearInstance object
                return new Armor({
                    id: armorObj.id,
                    name: armorObj.name,
                    description: armorObj.description,
                    image: armorObj.image,
                    cost: armorObj.cost,
                    weight: armorObj.weight,
                    tier: armorObj.tier,
                    armorType: armorObj.armorType,
                    jewelSlots: armorObj.jewelSlots,
                    slottedJewels: armorObj.slottedJewels,
                    maxJewelGrade: armorObj.maxJewelGrade,
                    material: armorObj.material,
                    spellCastingDamageMultiplier: armorObj.spellCastingDamageMultiplier,
                    spellCastingPenaltyHit: armorObj.spellCastingPenaltyHit,
                    arcaneAptitude: armorObj.arcaneAptitude,
                    specialTrait: armorObj.specialTrait,
                    defenseStats: armorObj.defenseStats,
                });
            }
            else {
                throw new Error(`Armor ${armor} not found in database`);
            }
        });
    }
    getAccessory(accessory) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessoryObj = yield this.read('Gears', 'id', accessory);
            if (accessoryObj) {
                return accessoryObj;
            }
            else {
                throw new Error(`Accessory ${accessory} not found in database`);
            }
        });
    }
    getResource(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const resourceObj = yield this.read('ItemResources', 'id', resource);
            if (resourceObj) {
                return resourceObj;
            }
            else {
                throw new Error(`Resource ${resource} not found in database`);
            }
        });
    }
    //MARK: Internals
    getInternal(internal) {
        return __awaiter(this, void 0, void 0, function* () {
            const internalObj = yield this.read('internals', 'id', internal);
            if (internalObj) {
                return internalObj;
            }
            else {
                throw new Error(`Internal ${internal} not found in database`);
            }
        });
    }
    //MARK: Skills
    getSkill(skill) {
        return __awaiter(this, void 0, void 0, function* () {
            const skillObj = yield this.read('skills', 'id', skill);
            if (skillObj) {
                return skillObj;
            }
            else {
                throw new Error(`Skill ${skill} not found in database`);
            }
        });
    }
    getCharacter(characterID) {
        return __awaiter(this, void 0, void 0, function* () {
            const characterObj = yield this.read('Character', 'id', characterID);
            if (characterObj) {
                return characterObj;
            }
            else {
                throw new Error(`Character ${characterID} not found in database`);
            }
        });
    }
}
export const db = new DB();
