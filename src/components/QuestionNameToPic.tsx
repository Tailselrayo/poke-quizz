import { Pokemon } from "@/types/Pokemon";
import { Button, SimpleGrid, Stack, Text } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";

interface QuestionNameToPicProps {
    isAnwsered?: boolean;
    questionNb: number;
    correctPoke: Pokemon | null;
    pokemons: Pokemon[] | null;
    onClick: (pokemon: string) => void;
    onLoad: () => void;
}

export function QuestionNameToPic(props: QuestionNameToPicProps) {
    const [imagesLoaded, setImagesLoaded] = useState(0);

    useEffect(()=>{
        if (imagesLoaded===4) {
            setImagesLoaded(0);
            props.onLoad();
        }
    }, [imagesLoaded])

    return (
        <Stack align="center" justify="center">
            <Text className="text-shadow">{`${props.questionNb}. Who is that Pokemon : ${props.correctPoke?.name}`}</Text>

            <SimpleGrid cols={2} spacing={30}>
                {Array.from({ length: 4 }).map((_, index) => {
                    const name = props.pokemons?.[index]?.name;
                    return (
                        <Button
                            key={index}
                            color={props.isAnwsered ?
                                (props.pokemons![index].name === props.correctPoke!.name ? "green" : "red") :
                                "primary"}
                            onClick={() => props.onClick(name!)}
                        >
                            {props.pokemons ?
                                <Image
                                    onLoad={()=>setImagesLoaded((s)=>s+1)}
                                    src={`${process.env.NEXT_PUBLIC_POKESPRITE_URL}${props.pokemons[index].id}.png`}
                                    alt="pokepic"
                                    width={120}
                                    height={120}
                                /> : <></>
                            }
                        </Button>
                    )
                })}
            </SimpleGrid>
        </Stack>
    )
}