import sqlite3 from 'sqlite3';
import { join } from 'path';

const DATABASE_FILE = join(__dirname, '..', '..', 'database.sqlite');
if(!DATABASE_FILE) {
    throw new Error('DB Failed');
}

export const openConnection = (): sqlite3.Database => {
    const db: sqlite3.Database = new sqlite3.Database(DATABASE_FILE);
    return db;
};

export const checkState = (): boolean => {
    const db: sqlite3.Database = openConnection();
    return db != null;
};

export const dbQuery = (query: string, params?: any[]): any => {
    const db: sqlite3.Database = openConnection();
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    })
        .finally(() => {
            db.close();
        });
};