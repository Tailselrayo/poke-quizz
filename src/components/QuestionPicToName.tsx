import { Pokemon } from "@/types/Pokemon";
import { Button, SimpleGrid, Stack, Text } from "@mantine/core";
import Image from "next/image";

interface QuestionPicToNameProps {
    isAnwsered?: boolean;
    questionNb: number;
    correctPoke: Pokemon | null;
    pokemons: Pokemon[] | null;
    onClick: (pokemon: string) => void;
    onLoad: () => void;
}

export function QuestionPicToName(props: QuestionPicToNameProps) {

    return (
        <Stack align="center" justify="center">
            <Text className="text-shadow">{`${props.questionNb}. Who is that Pokemon ?`}</Text>
            {props.correctPoke ?
                <Image
                    onLoad={props.onLoad}
                    src={`${process.env.NEXT_PUBLIC_POKESPRITE_URL}${props.correctPoke.id}.png`}
                    alt="pokepic"
                    width={150}
                    height={150}
                /> : <></>
            }
            <SimpleGrid cols={2} spacing={30}>
                {Array.from({ length: 4 }).map((_, index) => {
                    const name = props.pokemons?.[index]?.name;
                    return (
                        <Button 
                            key={index}
                            color={props.isAnwsered?
                                (props.pokemons![index].name===props.correctPoke!.name?"green":"red"):
                                "primary"} 
                            onClick={() => props.onClick(name!)}
                        >
                            {name}
                        </Button>
                    )
                })}
            </SimpleGrid>
        </Stack>
    )
}