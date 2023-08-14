import { Pokemon } from "@/types/Pokemon";
import { Button, SimpleGrid, Stack, Text } from "@mantine/core";
import Image from "next/image";
import { ButtonAnimation } from "./ButtonAnimation";

interface QuestionPicToNameProps {
    isAnwsered: boolean;
    isOnBreak: boolean;
    questionNb: number;
    correctPoke: Pokemon | null;
    pokemons: Pokemon[] | null;
    fiftyFifty: number[];
    onClick: (pokemon: string) => void;
}

export function QuestionPicToName(props: QuestionPicToNameProps) {
    const fiftyOn = props.fiftyFifty.length > 1;
    const fiftyTab = props.fiftyFifty;

    const onClick = (name: string) => {
        if (!props.isAnwsered) {
            props.onClick(name);
        }
    }

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
                            <ButtonAnimation key={index} delay={0.1} mounted={!props.isOnBreak}>
                                <Button
                                    w="100%"
                                    disabled={fiftyOn && fiftyTab.includes(index)}
                                    color={props.isAnwsered ?
                                        (name === props.correctPoke?.name ? "green2" : "red2") :
                                        "primary"}
                                    onClick={() => onClick(name!)}
                                >
                                    {name}
                                </Button>
                            </ButtonAnimation>
                        )
                    
                })}
            </SimpleGrid>
        </Stack>
    )
}