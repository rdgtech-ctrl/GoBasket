// here we can create database thesis
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import * as schema from "./schema";
// import everything from schema file

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });


export const db = drizzle(pool, { schema });
//  This creates a database connection using Drizzle ORM.This creates a database connection using Drizzle ORM.
// drizzle(pool, { schema })

// Creates a database instance
// pool = connection pool to your database
// schema = all your table definitions

// export const db

// Exports it so you can use it in other files
// db is instance which everytime we can connect to the database