import { execSync } from 'child_process'

console.log('🔄 Generating drizzle migrations...')

try {
    execSync('drizzle-kit generate', { stdio: 'inherit' })
    console.log('✅ Migrations generated successfully!')
} catch (error) {
    console.error('❌ Failed to generate migrations:', error)
    process.exit(1)
}
