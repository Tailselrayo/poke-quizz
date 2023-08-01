import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_DB_URL, process.env.NEXT_PUBLIC_DB_KEY);

export async function createUser(username: string) {
    if (await verifyUser(username, false)) {
        await supabase.from("users").insert({ username });
        return true
    }
    else {
        return false
    }
}

export async function verifyUser(username: string, isLogin: boolean) {
    const userData = (await supabase.from("users").select().match({ username })).data;
    //user is trying to login
    if (isLogin) {
        if (userData && userData.length !== 0) {
            return true;
        }
        return false;
    }
    //user is trying to register
    if (userData && userData.length === 0) {
        return true;
    }
    return false;
}