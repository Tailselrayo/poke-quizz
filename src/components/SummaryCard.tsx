import { PokemonData } from "@/types/PokemonData";
import { Card, Stack, Text } from "@mantine/core";

interface SummaryCardProps {
    data: PokemonData | undefined;
    cardIndex: number;
}

export function SummaryCard(props: SummaryCardProps) {
    const data = props.data;
    return (
        <Card 
            className="inner-border"
            bg={data ? (data.score !== 0 ? "green2" : "red2") : "rgba(200,200,200,1)"}
            w={250}
            p={0}
        >
            <Stack spacing={1} p={1}>
                {data ?
                    <>
                        <Text ta="center" className="text-shadow" fz={20}>{`Q${props.cardIndex}: ${data.pokemon}`}</Text>
                        <Text ta="center" fz="xs">{Math.round(data.score)}</Text>
                    </> : <></>}
            </Stack>
        </Card>
    )
}