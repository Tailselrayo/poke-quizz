import { SummaryCard } from "@/components/SummaryCard";
import { PokemonData } from "@/types/PokemonData";
import { UserInfos } from "@/types/UserInfos";
import { addOrUpdatePokedex } from "@/utils/supabase";
import { Button, Group, SimpleGrid, Stack, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Results() {
    const [currentUser] = useLocalStorage<UserInfos|null>({key: "pokemonCurUser", defaultValue: null})
    //Stock data from local storage to hooks to keep the UI updated unless refresh
    const [anwserSummary, setAnwserSummary] = useLocalStorage<PokemonData[]>({ key: "anwsers", defaultValue: [] })
    const [anwserStorage, setAnwserStorage] = useState<PokemonData[]>([]);
    const [hasLost, setHasLost] = useState<boolean>();
    const [totalScore, setTotalScore] = useState(0);

    const hasWon = (list: PokemonData[]) => {
        let count = 0;
        for (const poke of list) {
            setTotalScore((s) => s + poke.score);
            if (poke.score === 0) {
                count++;
            }
        }
        if (count > 2) {
            return false;
        }
        return true;
    }

    //getting the outcome of the game
    useEffect(() => {
        if (anwserSummary.length !== 0 && hasLost === undefined) {
            setHasLost(!hasWon(anwserSummary));
            setAnwserStorage(anwserSummary);
        }
    }, [anwserSummary, hasLost])

    //fill pokedex with data on victory
    useEffect(()=>{
        if (currentUser?.id&&hasLost===false&&anwserSummary.length) {
            anwserSummary.forEach(async (data) => {
                await addOrUpdatePokedex(currentUser.id, data.pokemon, data.id, data.score)
            })
            setAnwserSummary([]);
        }
    })

    return (
        <Stack spacing={10}>
            <Title className="text-shadow" ta="center">{!hasLost ? `VICTORY (${totalScore})` : "DEFEAT"} </Title>
            <SimpleGrid cols={4} spacing={20}>
                {Array.from({ length: 20 }).map((_, index) => {
                    const cardData = anwserStorage?.[index];
                    return (
                        <SummaryCard key={index} data={cardData} cardIndex={index + 1} />
                    )
                })}
            </SimpleGrid>
            <Group grow spacing={2}>
                <Link href="/game" style={{display: "block", width:"100%"}}>
                    <Button w="100%" color="primary">
                        Play Again
                    </Button>
                </Link>
                <Link href="/" style={{display: "block", width:"100%"}}>
                    <Button w="100%" color="secondary">
                        Home
                    </Button>
                </Link>
                <Link href="/pokedex" style={{display: "block", width:"100%"}}>
                    <Button w="100%" color="tertiary">
                        Pokedex
                    </Button>
                </Link>
            </Group>
        </Stack>
    )
}