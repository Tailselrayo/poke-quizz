import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_DB_URL, process.env.NEXT_PUBLIC_DB_KEY);

export async function createUser(username: string) {
    await supabase.from("users").insert({ username });
}

export async function verifyUser(username: string, isLogin: boolean) {
    //if name too short, insta reject authentification
    if (username.trim().length<4) {
        return false;
    }
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