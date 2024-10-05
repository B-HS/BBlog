import { headers } from 'next/headers'

export const useCurrentPath = () => {
    const headersList = headers()
    const domain = headersList.get('x-forwarded-host')
    const origin = headersList.get('x-forwarded-proto')

    return { domain, origin, url: `${origin}://${domain}` }
}
