import { drizzle } from 'drizzle-orm/mysql2'
import * as mysql from 'mysql2/promise'
import * as schema from './schema'

declare global {
    var _db: ReturnType<typeof drizzle> | undefined
}

const poolConnection = mysql.createPool({
    host: process.env.REMOTE_DATABASE_HOST || process.env.DATABASE_HOST,
    port: parseInt(process.env.REMOTE_DATABASE_PORT || process.env.DATABASE_PORT!),
    user: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.REMOTE_DATABASE_PASSWORD || process.env.DATABASE_PASSWORD,
})

const db = globalThis._db || drizzle(poolConnection, { schema, mode: 'default' })

if (process.env.NODE_ENV !== 'production') globalThis._db = db as typeof globalThis._db

export { db }
