import { db } from "../Database";
import { ClassModifier } from "./Character/ClassModifier";

export async function createTableIfNotExists(
    tableName: string,
    tableStructure: string,
    tableData: any[],
    primaryKeyColumn: string,
) {
    try {
        const tableExists = await db.tableExists(tableName);
        if (tableExists) {
            await checkDatabaseValidity(tableName, tableData, primaryKeyColumn);
            return;
        }

        // Create table
        await db.createTable(tableName, tableStructure);

        // Insert initial data into the newly created table
        await insertInitialData(tableName, tableData, primaryKeyColumn);

        // Validate the data to ensure everything is there
        await checkDatabaseValidity(tableName, tableData, primaryKeyColumn);
    } catch (err) {
        console.error(`Error creating or inserting data into table ${tableName}:`, err);
    }
}

async function insertInitialData(
    tableName: string,
    tableData: any[],
    primaryKeyColumn: string,
) {
    for (const item of tableData) {
        const data = Object.keys(item).map(key => ({
            dataKey: key,
            value: normalizeValue(item[key])
        }));

        // Apply class modifier if provided
        // Here we need to make it that if isCharacterTable = true, we need to look for classModifier from, I think inside the data.value

        try {
            await db.writeNew(
                {
                    tableName,
                    primaryKeyColumnName: primaryKeyColumn,
                    primaryKeyValue: item[primaryKeyColumn]
                },
                data
            );
            console.log(`Inserted row into ${tableName} with ID ${item[primaryKeyColumn]}`);
        } catch (err) {
            console.error(`Error inserting data into ${tableName}:`, err);
        }
    }
}

async function checkDatabaseValidity(
    tableName: string,
    tableData: any[],
    primaryKeyColumn: string
) {
    try {
        for (const item of tableData) {
            const primaryKeyValue = item[primaryKeyColumn];

            // Check if the row exists
            const record = await db.read(tableName, primaryKeyColumn, primaryKeyValue);

            if (!record) {
                // If the record doesn't exist, insert it
                const data = Object.keys(item).map(key => ({
                    dataKey: key,
                    value: normalizeValue(item[key])
                }));

                try {
                    await db.writeNew(
                        {
                            tableName,
                            primaryKeyColumnName: primaryKeyColumn,
                            primaryKeyValue: primaryKeyValue
                        },
                        data
                    );
                    console.log(`Inserted missing row into ${tableName} with ID ${primaryKeyValue}`);
                } catch (err) {
                    console.error(`Error inserting missing data into ${tableName}:`, err);
                }
            }
        }
    } catch (err) {
        console.error(`Error checking and validating data for table ${tableName}:`, err);
    }
}

function normalizeValue<T>(value: T): any {
    if (value === null || value === undefined) {
        return null;
    }
    if (typeof value === 'object') {
        return JSON.stringify(value);
    }
    return value;
}

export async function insertData(
    tableName: string,
    primaryKeyColumn: string,
    primaryKeyValue: any,
    data: { dataKey: string, value: any }[]
) {
    const normalizedData = data.map(item => ({
        dataKey: item.dataKey,
        value: normalizeValue(item.value)
    }));

    try {
        await db.writeNew(
            {
                tableName,
                primaryKeyColumnName: primaryKeyColumn,
                primaryKeyValue
            },
            normalizedData
        );
    } catch (err) {
        console.error(`Error inserting data into ${tableName}:`, err);
    }
}