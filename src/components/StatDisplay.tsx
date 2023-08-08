import { PokemonStats } from "@/types/PokemonStats";
import { Group, Stack, Text } from "@mantine/core";
import { StatText } from "./StatText";

interface StatDisplayProps {
    stats: PokemonStats[];
    isColorTooBright?: boolean;
}

export function StatDisplay(props: StatDisplayProps) {

    return (
        <Group w="100%" spacing={1} position="apart">
            <Stack align="start">
                {Array.from({ length: 3 }).map((_, index) => {
                    const stat = props.stats[index]
                    return (
                        <StatText 
                            key={index} 
                            name={stat.stat.name} 
                            value={stat.base_stat}
                            isColorTooBright={props.isColorTooBright}
                        />
                    )
                })}
            </Stack>
            <Stack align="start">
                {Array.from({ length: 3 }).map((_, index) => {
                    //plz don't ask. f(0)=5 => SPD, f(1)=3 => SPATK, f(2)=4 => SPDEF
                    const stat = props.stats[3*index**2/2-7*index/2+5]
                    return (
                        <StatText 
                            key={index} 
                            name={stat.stat.name} 
                            value={stat.base_stat}
                            isColorTooBright={props.isColorTooBright}
                        />
                    )
                })}

            </Stack>
        </Group>
    )
}