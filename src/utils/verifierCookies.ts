import { parseCookies } from "nookies";

export function VerifyCookies (ctx: any) {
    const { ["auth.token"]: token } = parseCookies(ctx);

    return !!token;
    
}
