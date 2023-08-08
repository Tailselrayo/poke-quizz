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

export async function getUserInfos(user: string) {
    return (await supabase.from("users").select().match({username: user}))?.data
}

export async function addOrUpdatePokedex(user: number, pokemon: string, id: number, xp: number) {
    const curData = (await supabase.from("pokedex").select().match({user, "poke-id": id}))?.data
    if (curData&&curData.length) {
        await supabase.from("pokedex").update({xp: curData[0].xp + xp}).match({user, "poke-id": id})
    } 
    else {
        await supabase.from("pokedex").insert({user, pokemon, "poke-id": id, xp});
    }
}

export async function fetchUserPokedex(user: number) {
    return (await supabase.from("pokedex").select().match({user}).order("poke-id",{ascending: true}))?.data
}

export async function addOrUpdateBadge(user: number, pokemon: number, affix: number) {
    const curData = (await supabase.from("badges").select().match({user, affix_pos: affix}))?.data
    if (curData&&curData.length) {
        await supabase.from("badges").update({pokemon_id: pokemon}).match({user, affix_pos: affix})
    } 
    else {
        await supabase.from("badges").insert({user, pokemon_id: pokemon, affix_pos: affix});
    }
}

export async function fetchUserBadges(user: number) {
    return (await supabase.from("badges").select().match({user}).order("affix_pos", {ascending: true}))?.data
}

export async function updateUserAvatar(user: number, pokemon: number) {
    await supabase.from("users").update({avatar: pokemon}).match({id: user})
}


