import { useEffect } from "react";
import { useInterval } from "@mantine/hooks";
import { Affix, Avatar, Box, Center, Stack, Text, Transition } from "@mantine/core";

interface GameTimerProps {
    timer: number;
    initTimer: number;
    changeTime: () => void;
}

export function GameTimer(props: GameTimerProps) {
    const interval = useInterval(() => props.changeTime(), 1000);
    const size = 150;
    const padding = 16;
    const beadSize = 30;
    const center = padding + size / 2;

    useEffect(() => {
        if (props.timer < 1) {
            return interval.stop();
        }
        interval.start();
    })

    return (
        <Center w={size} h={size}>
            <Text ta="center" ff="Gilroy-Bold.ttf">{props.timer} </Text>
            {
                Array.from({ length: props.initTimer }).map((_, index) => {
                    const slice = (2 * Math.PI) / props.initTimer;
                    const x = index * slice  + Math.PI / 2 + slice;
                    const p = beadSize / 2;
                    return (
                        <Transition mounted={!(10-index>props.timer)} transition="fade">
                            {(styles) => (  
                                <Affix style={styles} key={index} position={{ right: center + 50 * Math.cos(x) - p, top: center - 50 * Math.sin(x) - p }}>
                                    {/*<Box w={beadSize} h={beadSize} bg="yellow" ta="center" style={{ borderRadius: 999 }}></Box>*/}
                                    <Avatar size={beadSize} src="/facing-pokeball.png" alt="pb" />
                                </Affix>
                            )}
                        </Transition>
                    )
                })
            }
        </Center>
    )
}