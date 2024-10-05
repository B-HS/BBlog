import { z } from 'zod'

export const eventSchema = z.object({
    dtstamp: z.string().regex(/^\d{8}$/),
    uid: z.string().uuid(),
    dtstart: z.string().regex(/^\d{8}$/),
    class: z.string().default('PUBLIC'),
    summary: z.string(),
    transp: z.string().default('TRANSPARENT'),
    categories: z.array(z.string()),
    rrule: z.string().optional(),
})

export const calendarSchema = z.object({
    version: z.string().default('2.0'),
    prodid: z.string(),
    calscale: z.string().default('GREGORIAN'),
    name: z.string(),
    language: z.string(),
    region: z.string(),
    events: z.array(eventSchema),
})

export const convertICSToJSON = (icalData: string) => calendarSchema.parse(icalData)
