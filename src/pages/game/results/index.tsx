"use client"
import { ResultsButtons } from "@/components/ResultsButtons";
import { SummaryCard } from "@/components/SummaryCard";
import { useUser } from "@/hooks/useUser";
import { PokemonData } from "@/types/PokemonData";
import { addOrUpdatePokedex } from "@/utils/supabase";
import { SimpleGrid, Stack, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Results() {
    const router = useRouter()
    const {user} = useUser(()=>{}, ()=>router.push('/'))
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
        if (user?.userId&&hasLost===false&&anwserSummary.length) {
            anwserSummary.forEach(async (data) => {
                await addOrUpdatePokedex(user.userId!, data.pokemon, data.id, data.score)
            })
            setAnwserSummary([]);
        }
    })

    return (
        <Stack spacing="xs" h="100%" justify="space-between">
            <Title className="text-shadow" ta="center">{!hasLost ? `VICTORY (${totalScore})` : "DEFEAT"} </Title>
            <SimpleGrid cols={4} spacing={20}>
                {Array.from({ length: 20 }).map((_, index) => {
                    const cardData = anwserStorage?.[index];
                    return (
                        <SummaryCard key={index} data={cardData} cardIndex={index + 1} />
                    )
                })}
            </SimpleGrid>
            <ResultsButtons />
        </Stack>
    )
}