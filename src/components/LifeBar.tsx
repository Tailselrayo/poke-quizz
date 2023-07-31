import { Group } from "@mantine/core";
import { IconHeart, IconHeartBroken } from "@tabler/icons-react";

interface LifeBarProps {
    lives: number;
}

export function LifeBar(props: LifeBarProps) {
    return (
        <Group position="center" align="start" spacing={2}>
            {Array.from({ length: 3 }).map((_, index) => {
                if (index < props.lives) {
                    return (
                        <IconHeart fill="red" color="red" size={40}/>
                    )
                }
                else {
                    return (
                        <IconHeartBroken color="cyan" size={40}/>
                    )
                }
            })

            }
        </Group>
    )
}