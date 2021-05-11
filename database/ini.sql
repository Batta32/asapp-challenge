--
-- File generated with SQLiteStudio v3.3.3 on Thu May 6 20:48:18 2021
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: image
DROP TABLE IF EXISTS image;
CREATE TABLE image (messageId INTEGER REFERENCES message (id), url VARCHAR, height INTEGER, width INTEGER);

-- Table: message
DROP TABLE IF EXISTS message;
CREATE TABLE message (id INTEGER PRIMARY KEY AUTOINCREMENT, senderId INTEGER REFERENCES user (id), recipientId INTEGER REFERENCES user (id), contentType VARCHAR, timestamp INTEGER);

-- Table: text
DROP TABLE IF EXISTS text;
CREATE TABLE text (messageId INTEGER REFERENCES message (id), text VARCHAR);

-- Table: user
DROP TABLE IF EXISTS user;
CREATE TABLE user (id INTEGER PRIMARY KEY, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL);

-- Table: video
DROP TABLE IF EXISTS video;
CREATE TABLE video (messageId INTEGER REFERENCES message (id), url VARCHAR, source VARCHAR);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
