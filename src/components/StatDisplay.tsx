import { PokemonStats } from "@/types/PokemonStats";
import { Group, Stack, Text } from "@mantine/core";
import { StatText } from "./StatText";

interface StatDisplayProps {
    stats: PokemonStats[];
}

export function StatDisplay(props: StatDisplayProps) {

    return (
        <Group w="100%" spacing={1} position="apart">
            <Stack align="start">
                {Array.from({ length: 3 }).map((_, index) => {
                    const stat = props.stats[index]
                    return (
                        <StatText key={index} name={stat.stat.name} value={stat.base_stat}/>
                    )
                })}
            </Stack>
            <Stack align="start">
                {Array.from({ length: 3 }).map((_, index) => {
                    const stat = props.stats[index+3]
                    return (
                        <StatText key={index} name={stat.stat.name} value={stat.base_stat}/>
                    )
                })}

            </Stack>
        </Group>
    )
}