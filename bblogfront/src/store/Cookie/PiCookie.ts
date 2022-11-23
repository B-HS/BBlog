import Cookie from 'js-cookie'
export const PiCookie = (domain?:string, expire?:number, secure?:boolean, sameSite?:"strict" | "Strict" | "lax" | "Lax" | "none" | "None" | undefined) => {
    return {
        getCookie: (key: string) => {
            return Cookie.get(key)
        },

        setCookie: (key: string, val: string) => {
            return Cookie.set(key, val, {domain: domain, secure: secure, sameSite:sameSite, expires:expire})
        },

        rmCookie: (key: string) => {
            return Cookie.remove(key)
        }
    }
}
export default PiCookie