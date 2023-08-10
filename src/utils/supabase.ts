import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


export async function verifyUser(username: string, isLogin: boolean) {
    //if name too short, insta reject authentification
    if (username.trim().length < 4) {
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
    const data = await supabase.from("users").select().match({ user_id: user })
    return data.data
}

export async function addOrUpdatePokedex(user: string, pokemon: string, id: number, xp: number) {
    const curData = (await supabase.from("pokedex").select().match({ user, "poke-id": id }))?.data
    if (curData && curData.length) {
        await supabase.from("pokedex").update({ xp: curData[0].xp + xp }).match({ user, "poke-id": id })
    }
    else {
        await supabase.from("pokedex").insert({ user, pokemon, "poke-id": id, xp });
    }
}

export async function fetchUserPokedex(user: string) {
    return (await supabase.from("pokedex").select().match({ user }).order("poke-id", { ascending: true }))?.data
}

export async function updateBadges(user: string, pokemon: number, affix: number) {
    const property: any = {}
    property[`badge_${affix}`] = pokemon
    await supabase.from("users").update(property).match({user_id: user})
}

export async function updateUserAvatar(user: string, pokemon: number) {
    await supabase.from("users").update({ avatar: pokemon }).match({ user_id: user })
}

export async function signInWithEmail(email: string, password: string) {
    return (await supabase.auth.signInWithPassword({
        email,
        password,
    }))
}

export async function registerWithEmail(email: string, username: string, password: string) {
    const data = await supabase.auth.signUp({
        email,
        password,
    })
    if (data?.data) {
        await supabase.from("users").insert({ username, user_id: data.data.user?.id });
    }
    return data;
}

export async function signOut() {
    await supabase.auth.signOut();
}

export async function getUser() {
     const data = await supabase.auth.getUser()
     if (!data?.error) {
        return(data.data)
     }
}