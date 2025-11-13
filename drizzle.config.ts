import { defineConfig } from 'drizzle-kit'

const dbCredentials = {
    user: process.env.DATABASE_USERNAME!,
    password: process.env.REMOTE_DATABASE_PASSWORD || process.env.DATABASE_PASSWORD!,
    host: process.env.REMOTE_DATABASE_HOST || process.env.DATABASE_HOST!,
    port: parseInt(process.env.REMOTE_DATABASE_PORT || process.env.DATABASE_PORT!),
    database: process.env.DATABASE_NAME!,
}

export default defineConfig({
    schema: ['./db/schema.ts', './db/relations.ts'],
    out: './db/migrations',
    dialect: 'mysql',
    dbCredentials,
    verbose: true,
    strict: true,
})
