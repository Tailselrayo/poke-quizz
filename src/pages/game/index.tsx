import { DefeatModal } from "@/components/DefeatModal";
import { GameTimer } from "@/components/GameTimer";
import { LifeBar } from "@/components/LifeBar";
import { QuestionPicToName } from "@/components/QuestionPicToName";
import { VictoryModal } from "@/components/VictoryModal";
import { Pokemon } from "@/types/Pokemon";
import { getPokemons } from "@/utils/getPokemons";
import { Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";


export default function Game() {
    const initTimer = 10;
    const [lives, setLives] = useState(3);
    const [timer, setTimer] = useState(0);
    const [opened, modalHandlers] = useDisclosure();
    const [isGameOn, setIsGameOn] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [hasLost, setHasLost] = useState(false);
    const [isTimerStopped, setIsTimerStopped] = useState(false);
    const [isAnwsered, setIsAnwsered] = useState(false);
    const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
    const [correctPoke, setCorrectPoke] = useState<Pokemon | null>(null);
    const [questionNb, setQuestionNb] = useState(1);

    const onAnwser = (pokemon: string) => {
        if (timer === 0) {
            return;
        }
        setIsTimerStopped(true);
        setIsAnwsered(true);
        if (pokemon !== correctPoke!.name) {
            loseALife();
        }
        setTimeout(nextQuestion, 1000);
    }

    const nextQuestion = () => {
        console.log(pokemons, correctPoke)
        setQuestionNb(questionNb + 1);
        setIsTimerStopped(false);
        setIsAnwsered(false);
        setTimer(initTimer);
        setPokemons(null);
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

    useEffect(() => {
        if (!pokemons) {
            getPokemons(151).then((data) => {
                setPokemons(data)
                setCorrectPoke(data[~~(Math.random() * 4)])
                console.log(data)
            });
        }
    })

    useEffect(() => {
        if (!pokemons&&timer===0&&isGameOn) {
            setTimeout(timeRanOut, 1000);
        }
    }, [timer, pokemons])

    useEffect(() => {
        if (lives === 0) {
            setHasLost(true);
        }
        if (questionNb > 20) {
            setHasWon(true);
        }
    })


    return (
        <>
            <Stack>
                <Group w="100%" position="apart" align="start">
                    <LifeBar lives={lives} />
                    <QuestionPicToName
                        isAnwsered={isAnwsered}
                        questionNb={questionNb}
                        correctPoke={correctPoke}
                        pokemons={pokemons}
                        onClick={onAnwser}
                        onLoad={() => onImageLoad()}
                    />
                    <GameTimer
                        timer={timer}
                        isStopped={isTimerStopped}
                        initTimer={initTimer}
                        changeTime={() => setTimer((s) => s - 1)}
                    />
                </Group>
            </Stack>
            <VictoryModal opened={hasWon} onClose={modalHandlers.close}/>
            <DefeatModal opened={hasLost} onClose={modalHandlers.close}/>
        </>
    )
}