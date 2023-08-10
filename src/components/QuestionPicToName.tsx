import { Pokemon } from "@/types/Pokemon";
import { Button, SimpleGrid, Stack, Text } from "@mantine/core";
import Image from "next/image";

interface QuestionPicToNameProps {
    isAnwsered?: boolean;
    isOnBreak: boolean;
    questionNb: number;
    correctPoke: Pokemon | null;
    pokemons: Pokemon[] | null;
    onClick: (pokemon: string) => void;
}

export function QuestionPicToName(props: QuestionPicToNameProps) {

    return (
        <Stack align="center" justify="center">
            <Text className="text-shadow">{`${props.questionNb}. Who is that Pokemon ?`}</Text>
            {props.correctPoke ?
                <Image
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
                            display={props.isOnBreak?"none":""}
                            key={index}
                            color={props.isAnwsered?
                                (name===props.correctPoke?.name?"green2":"red2"):
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