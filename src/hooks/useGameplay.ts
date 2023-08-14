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
    const [pokePicker, setPokePicker] = useState<number>();
    //dynamic booleans
    const [isAnwsered, setIsAnwsered] = useState(false);
    const [isStorageCleaned, setIsStorageCleaned] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false)
    //storage & setups
    const [selectedGens] = useLocalStorage<number[] | null>({ key: "genStorage", defaultValue: null })
    const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
    const [correctPoke, setCorrectPoke] = useState<Pokemon | null>(null);
    const [anwserSummary, setAnwserSummary] = useLocalStorage<PokemonData[]>({ key: "anwsers", defaultValue: [] })
    //break timing handling
    const [isOnBreak, setIsOnBreak] = useState<boolean>(true);
    const interval = useInterval(() => setTimer((s) => (~~((s - 0.1) * 10)) / 10), 100);
    const breakInterval = useTimeout(() => setIsOnBreak(false), 1500);
    //bonuses hooks
    const [isSkipedBonus, setIsSkipedBonus] = useState<boolean>();
    const [isFiftyFifty, setIsFiftyFifty] = useState<number[]>([-1]);

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
        setTimeout(()=>setIsOnBreak(true),500);
        setTimeout(nextQuestion, 1000);
    }

    const nextQuestion = () => {
        if (!isSkipedBonus) {
            setQuestionNb(questionNb + 1);
        }
        setIsAnwsered(false)
        setPokePicker(undefined)
        setCorrectPoke(null);
        setQuestionPicker(Math.random());
    }

    const loseALife = () => {
        setLives(lives - 1)
    }

    const getTwoRandPoke = () => {
        let tab: number[] = [];
        while (tab.length < 2) {
            const randomPoke = ~~(Math.random() * 4)
            if (randomPoke !== pokePicker && !tab.includes(randomPoke)) {
                tab.push(randomPoke)
            }
            console.log("correct : ", pokePicker, "random : ", randomPoke, " tab : ", tab)
        }
        return tab;
    }

    //handle break time between question appearing and answers appearing
    useEffect(() => {
        if (!isOnBreak && !isAnwsered) {
            interval.start();
            return interval.stop
        }
    }, [isOnBreak, isAnwsered, interval])

    //refresh random number ahead of API call
    useEffect(()=>{
        if (!pokePicker&&!pokemons&&isOnBreak) {
            
        }
    })

    //refill of pokemons each question and init all revelant variables
    useEffect(() => {
        if (!correctPoke && selectedGens) {
            const randomNb = ~~(Math.random()*4);
            setPokePicker(randomNb);
            getPokemons(selectedGens)
                .then((data) => {
                    setPokemons(data)
                    setCorrectPoke(data[randomNb])
                    setTimer(initTimer);
                    breakInterval.start();
                });
        }
    }, [correctPoke, selectedGens])

    //empty local storage at the start of each new game
    useEffect(() => {
        if (!isStorageCleaned && !isOnBreak) {
            setAnwserSummary([]);
            setIsStorageCleaned(true);
        }
    }, [isStorageCleaned, isOnBreak])

    //check if question ran out of time
    useEffect(() => {
        if (timer < 0.1 && !isOnBreak) {
            setTimer(initTimer)
            onAnwser("");
        }
    }, [timer])

    //handles skip bonus
    useEffect(() => {
        if (isSkipedBonus) {
            nextQuestion();
            setIsSkipedBonus(false);
        }
    })

    //block 50/50 bonus if activated
    useEffect(() => {
        if (isFiftyFifty.length !== 1 && isOnBreak) {
            setIsFiftyFifty([4]);
        }
    })


    //check for game being completed
    useEffect(() => {
        if ((lives === 0 || questionNb > 20) && !isGameFinished) {
            setIsOnBreak(true);
            setIsGameFinished(true)
            router.push("/game/results");
        }
    }, [lives, questionNb, router, isGameFinished])

    return ({
        values: {
            lives,
            timer,
            questionNb,
            questionPicker,
            isAnwsered,
            pokemons,
            correctPoke,
            initTimer,
            isOnBreak,
            isFiftyFifty,
            isSkipedBonus,
        },
        handlers: { onAnwser, setTimer, setIsSkipedBonus, setIsFiftyFifty, getTwoRandPoke }
    })
}