import { drizzle } from 'drizzle-orm/mysql2'
import { migrate } from 'drizzle-orm/mysql2/migrator'
import * as mysql from 'mysql2/promise'
import { sql } from 'drizzle-orm'

const resetDatabase = async () => {
    console.log('⚠️  Starting database reset...')

    const connection = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT!),
        user: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
    })

    const db = drizzle(connection)

    try {
        console.log('🗑️  Dropping all tables...')

        await connection.query('SET FOREIGN_KEY_CHECKS = 0')

        const [tables] = await connection.query<mysql.RowDataPacket[]>(`SELECT table_name FROM information_schema.tables WHERE table_schema = ?`, [
            process.env.DATABASE_NAME,
        ])

        for (const table of tables) {
            const tableName = table.table_name || table.TABLE_NAME
            console.log(`  Dropping table: ${tableName}`)
            await connection.query(`DROP TABLE IF EXISTS \`${tableName}\``)
        }

        await connection.query('SET FOREIGN_KEY_CHECKS = 1')

        console.log('✅ All tables dropped successfully!')
        console.log('🔄 Running migrations...')

        await migrate(db, { migrationsFolder: './db/migrations' })

        console.log('✅ Database reset completed successfully!')
    } catch (error) {
        console.error('❌ Reset failed:', error)
        process.exit(1)
    } finally {
        await connection.end()
    }
}

resetDatabase()
