import { Pokemon } from "@/types/Pokemon";
import { sumNumberList } from "./sumNumberList";

export async function getPokemons(selectedGens: number[]) {
    console.log("getPokemons activated")

    
    const idTab = new Set<number>();
    const pokeTab: Pokemon[] = [];

    while (idTab.size < 4){
        idTab.add(randomPoke(selectedGens))
    }
    for (const id of Array.from(idTab)) {
        pokeTab.push(await (await fetch(`${process.env.NEXT_PUBLIC_POKEAPI_URL}${id}`)).json())
    }
    
    return pokeTab;
}

function randomPoke(list: number[]) {
    const genSizes = [151, 100, 135, 113, 92, 72, 88, 96, 105] //9 generations in
    const randomGen = list[~~(Math.random()*list.length)] //get the gen of random poke
    const genBiais = genSizes.slice(0,randomGen-1).reduce((prev, cur)=>prev+cur, 0) //get the starting point of gen indexes
    const randomPoke = Math.ceil(Math.random()*genSizes[randomGen-1]) //get the random poke 
    console.log("Gen", randomGen, "biais", genBiais)
    return randomPoke+genBiais
}