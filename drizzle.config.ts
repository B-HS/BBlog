import { defineConfig } from 'drizzle-kit'

const dbCredentials = {
    user: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    host: process.env.DATABASE_HOST!,
    port: parseInt(process.env.DATABASE_PORT!),
    database: process.env.DATABASE_NAME!,
}

export default defineConfig({
    schema: ['./drizzle/schema.ts', './drizzle/relations.ts'],
    out: './drizzle',
    dialect: 'mysql',
    dbCredentials,
    verbose: true,
    strict: true,
})
