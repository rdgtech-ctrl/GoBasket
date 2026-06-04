/// <reference types="node" />
import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});

/*
This is your Drizzle ORM configuration file (drizzle.config.ts).
It tells Drizzle how to manage your database.
/// <reference types="node" />

TypeScript comment for Node.js types

defineConfig({ ... })

Drizzle configuration object

schema: "./src/db/schema.ts"

Path to your database table definitions
This file contains all your pgTable() definitions

out: "./drizzle"

Output folder for migrations
Drizzle generates migration files here

dialect: "postgresql"

Database type you're using (PostgreSQL)
Could be: mysql, sqlite, etc.
*/