import { GameTimer } from "@/components/GameTimer";
import { LifeBar } from "@/components/LifeBar";
import {  Group, Stack, Text} from "@mantine/core";
import { useEffect, useState } from "react";


export default function Game() {
    const initTimer = 10;
    const [lives, setLives] = useState(3);
    const [timer, setTimer] = useState(initTimer);
    
    return(
        <Stack>
            <Group w="100%" position="apart" align="start">
                <LifeBar lives={lives} />
                <GameTimer 
                    timer={timer}
                    initTimer={initTimer}
                    changeTime={()=>setTimer((s)=>s-1)}
                />
            </Group>
        </Stack>
    )
}