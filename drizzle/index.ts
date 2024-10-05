import { drizzle } from 'drizzle-orm/mysql2'
import * as mysql from 'mysql2/promise'

declare global {
    // eslint-disable-next-line no-unused-vars
    var _db: ReturnType<typeof drizzle> | undefined
}

const poolConnection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT!),
    user: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
})

const db = globalThis._db || drizzle(poolConnection)

if (process.env.NODE_ENV !== 'production') {
    globalThis._db = db
}

export { db }
