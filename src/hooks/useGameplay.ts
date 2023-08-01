import { Pokemon } from "@/types/Pokemon";
import { getPokemons } from "@/utils/getPokemons";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useGamePlay() {
    //dynamic values
    const [lives, setLives] = useState(3);
    const [timer, setTimer] = useState(0);
    const [questionPicker, setQuestionPicker] = useState(Math.random());
    //dynamic booleans
    const [isGameOn, setIsGameOn] = useState(false);
    const [isTimerStopped, setIsTimerStopped] = useState(false);
    const [isAnwsered, setIsAnwsered] = useState(false);
    const [isStorageCleaned, setIsStorageCleaned] = useState(false);
    //storage
    const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
    const [correctPoke, setCorrectPoke] = useState<Pokemon | null>(null);
    const [anwserSummary, setAnwserSummary] = useLocalStorage<{pokemon: string, score: number}[]>({key: "anwsers", defaultValue: []})
    
    const [questionNb, setQuestionNb] = useState(1);
    const router = useRouter();

    const initTimer = 10;

    const onAnwser = (pokemon: string) => {
        if (timer === 0) {
            return;
        }
        setIsTimerStopped(true);
        setIsAnwsered(true);
        if (pokemon !== correctPoke!.name) {
            loseALife();
            setAnwserSummary(anwserSummary.concat([{pokemon: correctPoke!.name, score: 0}]))
        }
        else {
            setAnwserSummary(anwserSummary.concat([{pokemon: correctPoke!.name, score: Math.round(timer*100)}]))
        }
        
        setTimeout(nextQuestion, 1000);
    }

    const nextQuestion = () => {
        setQuestionNb(questionNb + 1);
        setIsTimerStopped(false);
        setIsAnwsered(false);
        setIsGameOn(false);
        setPokemons(null);
        setQuestionPicker(Math.random());
    }

    const timeRanOut = () => {
        loseALife();
        nextQuestion();
    }

    const loseALife = () => {
        setLives(lives - 1)
    }

    const onImageLoad = () => {
        setTimer(initTimer);
        setIsGameOn(true);
    }

    //refill of pokemons each question
    useEffect(() => {
        if (!pokemons) {
            getPokemons(151).then((data) => {
                setPokemons(data)
                setCorrectPoke(data[~~(Math.random() * 4)])
            });
        }
    })

    //empty local storage each new game
    useEffect(()=>{
        if (anwserSummary.length!==0&&!isStorageCleaned) {
            setAnwserSummary([]);
            setIsStorageCleaned(true);
        }
    },[anwserSummary, isStorageCleaned])
    
    //check if question ran out of time
    useEffect(() => {
        if (!pokemons&&timer<0.1&&isGameOn) {
            setTimeout(timeRanOut, 1000);
        }
    }, [timer, pokemons])

    //check for game being completed
    useEffect(() => {
        if (lives === 0||questionNb>20) {
            setTimer(-1);
            router.push("/game/results");
        }
    }, [lives, questionNb])

    return ({
        values: {lives, timer, questionNb, questionPicker, isTimerStopped, isAnwsered, pokemons, correctPoke, initTimer},
        handlers: {onAnwser, onImageLoad, setTimer}
    })
}