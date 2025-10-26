import { drizzle } from 'drizzle-orm/mysql2'
import { migrate } from 'drizzle-orm/mysql2/migrator'
import * as mysql from 'mysql2/promise'

const runMigration = async () => {
    console.log('🔄 Running database migrations...')

    const connection = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT!),
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    const db = drizzle(connection)

    try {
        await migrate(db, { migrationsFolder: './db/migrations' })
        console.log('✅ Migrations completed successfully!')
    } catch (error) {
        console.error('❌ Migration failed:', error)
        process.exit(1)
    } finally {
        await connection.end()
    }
}

runMigration()
