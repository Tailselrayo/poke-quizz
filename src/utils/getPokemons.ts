import { Pokemon } from "@/types/Pokemon";

export async function getPokemons(limit: number) {
    console.log("getPokemons activated")
    const idTab = new Set<number>();
    const pokeTab: Pokemon[] = [];

    if (limit < 4) return [];

    while (idTab.size < 4){
        idTab.add(~~(Math.random()*limit))
    }
    for (const id of Array.from(idTab)) {
        pokeTab.push(await (await fetch(`${process.env.NEXT_PUBLIC_POKEAPI_URL}${id}`)).json())
    }
    
    return pokeTab;
}