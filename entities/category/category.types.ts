import { categories } from 'drizzle/schema'

export type Category = typeof categories.$inferSelect
