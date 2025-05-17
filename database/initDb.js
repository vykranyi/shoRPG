import sqlite3 from "sqlite3";
import { open } from "sqlite";

export let db;

export async function initDb() {
  db = await open({
    filename: "./database/shoRpg.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      level INTEGER DEFAULT 1,
      exp INTEGER DEFAULT 0,
      inventory TEXT DEFAULT '[]'
    );
    CREATE TABLE IF NOT EXISTS enemies (
      id INTEGER PRIMARY KEY,
      name TEXT DEFAULT 'Ворог',
      level INTEGER DEFAULT 1,
      damage INTEGER DEFAULT 1,
      health INTEGER DEFAULT 10,
      armor INTEGER DEFAULT 0
    );
  `);
}
