import { GameTimer } from "@/components/GameTimer";
import { LifeBar } from "@/components/LifeBar";
import { QuestionNameToPic } from "@/components/QuestionNameToPic";
import { QuestionPicToName } from "@/components/QuestionPicToName";
import { useGamePlay } from "@/hooks/useGameplay";
import { ActionIcon, Affix, Group, Stack } from "@mantine/core";
import { IconBoxMultiple2, IconRefresh } from "@tabler/icons-react";

export default function Game() {
    const { values, handlers } = useGamePlay();

    return (
        <>
            <Stack>
                <Group w="100%" position="apart" align="start">
                    <LifeBar lives={values.lives} />
                    {values.questionPicker > 0.5 ?
                        <QuestionPicToName
                            isAnwsered={values.isAnwsered}
                            questionNb={values.questionNb}
                            correctPoke={values.correctPoke}
                            pokemons={values.pokemons}
                            onClick={handlers.onAnwser}
                            isOnBreak={values.isOnBreak}
                            fiftyFifty={values.isFiftyFifty}
                        /> :
                        <QuestionNameToPic
                            isAnwsered={values.isAnwsered}
                            questionNb={values.questionNb}
                            correctPoke={values.correctPoke}
                            pokemons={values.pokemons}
                            onClick={handlers.onAnwser}
                            isOnBreak={values.isOnBreak}
                            fiftyFifty={values.isFiftyFifty}
                        />}
                    <GameTimer
                        timer={values.timer}
                        initTimer={values.initTimer}
                    />
                    <Affix position={{ right: 40, top: 200 }} zIndex={1}>
                        <Stack>
                            <ActionIcon
                                onClick={() => handlers.setIsSkipedBonus(true)}
                                disabled={values.isSkipedBonus === false}
                                variant="filled"
                                color="yellow.3"
                                size={100}
                            >
                                <IconRefresh size={100} color={values.isSkipedBonus === false?"lightgray":"black"} />
                            </ActionIcon>
                            <ActionIcon
                                onClick={() => handlers.setIsFiftyFifty(handlers.getTwoRandPoke())}
                                disabled={values.isFiftyFifty[0] !== -1}
                                variant="filled"
                                color="yellow.3"
                                size={100}
                            >
                                <IconBoxMultiple2 size={100} color={values.isFiftyFifty[0] !== -1?"lightgray":"black"} />
                            </ActionIcon>
                        </Stack>
                    </Affix>
                </Group>
            </Stack>
        </>
    )
}