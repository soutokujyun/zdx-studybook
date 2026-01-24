import { SqlDatabase } from "@langchain/classic/sql_db";
import { DataSource } from "typeorm";

async function getDb(): Promise<SqlDatabase | undefined> {
    const datasource = new DataSource({ type: "mysql", host: "localhost", port: 3306, username: "root", password: "123456", database: "dass" });
    const db = await SqlDatabase.fromDataSourceParams({ appDataSource: datasource });
    return db;
}

export const db: SqlDatabase | undefined = await getDb();

export async function getSchema() {
  if (!db) {
    throw new Error("db is not initialized");
  }
  return await db.getTableInfo();
}