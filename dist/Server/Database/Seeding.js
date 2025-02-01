var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { db } from "../Database";
export function createTableIfNotExists(tableName, tableStructure, tableData, primaryKeyColumn) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Checking table ${tableName}...`);
        try {
            const tableExists = yield db.tableExists(tableName);
            console.log(`Table ${tableName} exists: ${tableExists}`);
            if (tableExists) {
                yield checkDatabaseValidity(tableName, tableData, primaryKeyColumn);
                return;
            }
            // Create table
            yield db.createTable(tableName, tableStructure);
            // Insert initial data into the newly created table
            yield insertInitialData(tableName, tableData, primaryKeyColumn);
            // Validate the data to ensure everything is there
            yield checkDatabaseValidity(tableName, tableData, primaryKeyColumn);
        }
        catch (err) {
            console.error(`Error creating or inserting data into table ${tableName}:`, err);
        }
    });
}
function insertInitialData(tableName, tableData, primaryKeyColumn) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const item of tableData) {
            const data = Object.keys(item).map(key => ({
                dataKey: key,
                value: normalizeValue(item[key])
            }));
            // Apply class modifier if provided
            // Here we need to make it that if isCharacterTable = true, we need to look for classModifier from, I think inside the data.value
            try {
                yield db.writeNew({
                    tableName,
                    primaryKeyColumnName: primaryKeyColumn,
                    primaryKeyValue: item[primaryKeyColumn]
                }, data);
                console.log(`Inserted row into ${tableName} with ID ${item[primaryKeyColumn]}`);
            }
            catch (err) {
                console.error(`Error inserting data into ${tableName}:`, err);
            }
        }
    });
}
function checkDatabaseValidity(tableName, tableData, primaryKeyColumn) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (const item of tableData) {
                const primaryKeyValue = item[primaryKeyColumn];
                // Check if the row exists
                const record = yield db.read(tableName, primaryKeyColumn, primaryKeyValue);
                if (!record) {
                    // If the record doesn't exist, insert it
                    const data = Object.keys(item).map(key => ({
                        dataKey: key,
                        value: normalizeValue(item[key])
                    }));
                    try {
                        yield db.writeNew({
                            tableName,
                            primaryKeyColumnName: primaryKeyColumn,
                            primaryKeyValue: primaryKeyValue
                        }, data);
                        console.log(`Inserted missing row into ${tableName} with ID ${primaryKeyValue}`);
                    }
                    catch (err) {
                        console.error(`Error inserting missing data into ${tableName}:`, err);
                    }
                }
            }
        }
        catch (err) {
            console.error(`Error checking and validating data for table ${tableName}:`, err);
        }
    });
}
function normalizeValue(value) {
    if (value === null || value === undefined) {
        return null;
    }
    if (typeof value === 'object') {
        return JSON.stringify(value);
    }
    return value;
}
export function insertData(tableName, primaryKeyColumn, primaryKeyValue, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const normalizedData = data.map(item => ({
            dataKey: item.dataKey,
            value: normalizeValue(item.value)
        }));
        try {
            yield db.writeNew({
                tableName,
                primaryKeyColumnName: primaryKeyColumn,
                primaryKeyValue
            }, normalizedData);
        }
        catch (err) {
            console.error(`Error inserting data into ${tableName}:`, err);
        }
    });
}
