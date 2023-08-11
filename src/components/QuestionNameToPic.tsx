import { Pokemon } from "@/types/Pokemon";
import { Button, SimpleGrid, Stack, Text } from "@mantine/core";
import Image from "next/image";
import { ButtonAnimation } from "./ButtonAnimation";

interface QuestionNameToPicProps {
    isAnwsered?: boolean;
    isOnBreak: boolean;
    questionNb: number;
    correctPoke: Pokemon | null;
    pokemons: Pokemon[] | null;
    fiftyFifty: number[];
    onClick: (pokemon: string) => void;
}

export function QuestionNameToPic(props: QuestionNameToPicProps) {
    const fiftyOn = props.fiftyFifty.length > 1;
    const fiftyTab = props.fiftyFifty;

    return (
        <Stack align="center" justify="center">
            <Text className="text-shadow">{`${props.questionNb}. Who is that Pokemon : ${props.correctPoke?.name??""}`}</Text>
            <SimpleGrid cols={2} spacing={30}>
                {Array.from({ length: 4 }).map((_, index) => {
                    const name = props.pokemons?.[index]?.name;
                        return (
                            <ButtonAnimation key={index} mounted={!props.isOnBreak}>
                                <Button
                                    disabled={fiftyOn && fiftyTab.includes(index)}
                                    color={props.isAnwsered ?
                                        (name === props.correctPoke?.name ? "green2" : "red2") :
                                        "primary"}
                                    onClick={() => props.onClick(name!)}
                                >
                                    {props.pokemons ?
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_POKESPRITE_URL}${props.pokemons[index].id}.png`}
                                            alt="pokepic"
                                            width={120}
                                            height={120}
                                        /> : <></>
                                    }
                                </Button>
                            </ButtonAnimation>
                        )
                    
                })}
            </SimpleGrid>
        </Stack>
    )
}