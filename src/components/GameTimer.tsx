import { Affix, Center, Text, Transition } from "@mantine/core";
import Image from "next/image";

interface GameTimerProps {
    timer: number;
    initTimer: number;
}

export function GameTimer(props: GameTimerProps) {

    const size = 150;
    const padding = 16;
    const beadSize = 50;
    const center = padding + size / 2;

    return (
        <Center w={size} h={size}>
            <Text className="text-shadow" ta="center" ff="Gilroy">{props.timer} </Text>
            {
                Array.from({ length: props.initTimer }).map((_, index) => {
                    const slice = (2 * Math.PI) / props.initTimer;
                    const x = index * slice  + Math.PI / 2 + slice;
                    const p = beadSize / 2;
                    return (
                        <Transition key={index} mounted={!(10-index>props.timer)} transition="fade">
                            {(styles) => (  
                                <Affix 
                                    style={{...styles}} 
                                    position={{ right: center + 50 * Math.cos(x) - p, top: center - 50 * Math.sin(x) - p }}
                                >
                                    {/*<Box w={beadSize} h={beadSize} bg="yellow" ta="center" style={{ borderRadius: 999 }}></Box>*/}
                                    <Image 
                                        height={beadSize} 
                                        width={beadSize} 
                                        src="/facing-pokeball.png" 
                                        alt="pb" />
                                </Affix>
                            )}
                        </Transition>
                    )
                })
            }
        </Center>
    )
}