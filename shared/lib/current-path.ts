export const currentPath = () => {
    const serverURL = process.env.SITE_URL?.split('://')
    const domain = serverURL?.at(1)!
    const origin = serverURL?.at(0)!

    return { domain, origin, url: `${origin}://${domain}` }
}
