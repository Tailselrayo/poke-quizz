import { PokemonTypes } from "@/types/PokemonTypes";
//returns a mantine color and its intensities used in pokedex card context
export function getColorsFromTypes(types: PokemonTypes[]): [string, number, number]{
    const mainType = types[0].type.name;
    const condition = (type: string) => {
        return mainType===type
    } 
    if (condition("grass")||condition("bug")) return ["green", 5, 3]
    else if (condition("ghost")||condition("dark")) return ["dark", 7, 5]
    else if (condition("dragon")||condition("fire")||condition("fighting")) return ["red", 7, 5]
    else if (condition("electric")) return ["yellow", 4, 2]
    else if (condition("fairy")) return ["pink", 4, 2]
    else if (condition("flying")||condition("normal")||condition("steel")) return ["gray", 5, 3]
    else if (condition("ice")||condition("water")) return ["cyan", 7, 5]
    else if (condition("ground")||condition("rock")) return ["orange", 5, 3]
    else return ["violet", 7, 5]

}