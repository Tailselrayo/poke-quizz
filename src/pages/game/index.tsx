import { GameTimer } from "@/components/GameTimer";
import { LifeBar } from "@/components/LifeBar";
import { QuestionNameToPic } from "@/components/QuestionNameToPic";
import { QuestionPicToName } from "@/components/QuestionPicToName";
import { useGamePlay } from "@/hooks/useGameplay";
import { Group, Stack } from "@mantine/core";

export default function Game() {
    const {values, handlers} = useGamePlay();

    console.log(values.questionPicker)  

    return (
        <>
            <Stack>
                <Group w="100%" position="apart" align="start">
                    <LifeBar lives={values.lives} />
                    {values.questionPicker>0.5 ?
                    <QuestionPicToName
                        isAnwsered={values.isAnwsered}
                        questionNb={values.questionNb}
                        correctPoke={values.correctPoke}
                        pokemons={values.pokemons}
                        onClick={handlers.onAnwser}
                        onLoad={handlers.onImageLoad}
                    />:
                    <QuestionNameToPic 
                        isAnwsered={values.isAnwsered}
                        questionNb={values.questionNb}
                        correctPoke={values.correctPoke}
                        pokemons={values.pokemons}
                        onClick={handlers.onAnwser}
                        onLoad={handlers.onImageLoad}
                    />}
                    <GameTimer
                        timer={values.timer}
                        isStopped={values.isTimerStopped}
                        initTimer={values.initTimer}
                        changeTime={() => handlers.setTimer((s) => (~~((s - 0.1)*10))/10)}
                    />
                </Group>
            </Stack>
        </>
    )
}