import { PokemonData } from "@/types/PokemonData";
import { Pokemon } from "@/types/Pokemon";
import { getPokemons } from "@/utils/getPokemons";
import { useInterval, useLocalStorage, useTimeout } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useGamePlay() {
    //dynamic values
    const [lives, setLives] = useState(3);
    const [timer, setTimer] = useState(10);
    const [questionPicker, setQuestionPicker] = useState(0);
    //dynamic booleans
    const [isAnwsered, setIsAnwsered] = useState(false);
    const [isStorageCleaned, setIsStorageCleaned] = useState(false);
    //storage & setups
    const [selectedGens] = useLocalStorage<number[] | null>({ key: "genStorage", defaultValue: null })
    const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
    const [correctPoke, setCorrectPoke] = useState<Pokemon | null>(null);
    const [anwserSummary, setAnwserSummary] = useLocalStorage<PokemonData[]>({ key: "anwsers", defaultValue: [] })
    //break timing handling
    const [isOnBreak, setIsOnBreak] = useState<boolean>(true);
    const interval = useInterval(() => setTimer((s) => (~~((s - 0.1)*10))/10), 100);
    const breakInterval = useTimeout(()=>setIsOnBreak(false), 1500);

    //utils
    const [questionNb, setQuestionNb] = useState(1);
    const router = useRouter();

    const initTimer = 10;

    const onAnwser = (pokemon: string) => {
        setIsAnwsered(true);
        if (pokemon !== correctPoke!.name) {
            loseALife();
            setAnwserSummary((summary) => summary.concat([{ pokemon: correctPoke!.name, id: correctPoke!.id, score: 0 }]))
        }
        else {
            setAnwserSummary((summary) => summary.concat([{ pokemon: correctPoke!.name, id: correctPoke!.id, score: Math.round(timer * 100) }]))
        }

        setTimeout(nextQuestion, 1000);
    }

    const nextQuestion = () => {
        setQuestionNb(questionNb + 1);
        setIsAnwsered(false)
        setPokemons(null);
        setQuestionPicker(Math.random());
    }

    const loseALife = () => {
        setLives(lives - 1)
    }

    //handle break time between question appearing and answers appearing
    useEffect(()=>{
        if (!isOnBreak&&!isAnwsered) {
            interval.start();
            return interval.stop
        }
    },[isOnBreak, isAnwsered, interval])

    //refill of pokemons each question and init all revelant variables
    useEffect(() => {
        if (!pokemons && selectedGens) {
            getPokemons(selectedGens).then((data) => {
                setPokemons(data)
                setCorrectPoke(data[~~(Math.random() * 4)])
                setIsOnBreak(true)
                setTimer(initTimer);
                breakInterval.start();
            });
        }
    }, [pokemons, selectedGens])

    //empty local storage at the start of each new game
    useEffect(() => {
        if (anwserSummary.length !== 0 && !isStorageCleaned) {
            setAnwserSummary([]);
            setIsStorageCleaned(true);
        }
        else if (isAnwsered && anwserSummary.length === 0) {
            setIsStorageCleaned(true)
        }
    }, [anwserSummary, isStorageCleaned, isOnBreak])

    //check if question ran out of time
    useEffect(() => {
        if (timer < 0.1) {
            onAnwser("");
        }
    }, [timer])

    //check for game being completed
    useEffect(() => {
        if (lives === 0 || questionNb > 20) {
            setTimer(-1);
            router.push("/game/results");
        }
    }, [lives, questionNb, router])

    return ({
        values: { lives, timer, questionNb, questionPicker, isAnwsered, pokemons, correctPoke, initTimer, isOnBreak },
        handlers: { onAnwser, setTimer }
    })
}