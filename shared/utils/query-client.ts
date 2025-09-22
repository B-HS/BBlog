import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

export const query = cache(() => new QueryClient())
