import sqlite3 from 'sqlite3';
import { join } from 'path';
import { existsSync } from 'fs';

// Path to local database
const DATABASE_FILE = join(__dirname, '..', '..', 'database.sqlite');

// Open connection to database
export const openConnection = (): sqlite3.Database => {
    const db: sqlite3.Database = new sqlite3.Database(DATABASE_FILE);
    return db;
};

// Query to database
export const dbQuery = (query: string, params?: any[]): any => {
    const db: sqlite3.Database = openConnection();
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    }).finally(() => {
        db.close();
    });
};

export const dbInsert = (query: string, params?: any[]): any => {
    const db: sqlite3.Database = openConnection();
    return new Promise((resolve, reject) => {
        db.run(query, params, function(err) {
            if (err) {
                console.log('Error running sql ' + query);
                console.log(err);
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    }).finally(() => {
        db.close();
    });
};

// Check state of database
export const checkState = (): boolean => {
    return existsSync(DATABASE_FILE);
};
