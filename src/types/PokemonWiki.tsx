import { PokemonStats } from "./PokemonStats";
import { PokemonTypes } from "./PokemonTypes";

export interface PokemonWiki {
    name: string;
    id: number;
    weight: number;
    types: PokemonTypes[];
    stats: PokemonStats[];
}