import { PokemonData } from "@/types/PokemonData";
import { Card, Stack, Text } from "@mantine/core";
import { ButtonAnimation } from "./ButtonAnimation";

interface SummaryCardProps {
    data: PokemonData | undefined;
    cardIndex: number;
}

export function SummaryCard(props: SummaryCardProps) {
    const index = props.cardIndex;
    const data = props.data;
    return (
        <ButtonAnimation delay={((index-1)%4+Math.ceil(index/4))/8}>
            <Card
                className="inner-border"
                bg={data ? (data.score !== 0 ? "green2" : "red2") : "rgba(200,200,200,1)"}
                mx="auto"
                w={250}
                mih={74}
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
        </ButtonAnimation>
    )
}