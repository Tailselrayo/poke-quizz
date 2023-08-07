import { Box, HoverCard, Tooltip } from "@mantine/core";

interface StatBarProps {
    size?: number;
    value: number;
    color: string;
}

export function StatBar(props: StatBarProps) {
    return (
        <Box
            bg="gray.1"
            h={5}
            w={props.size ?? 150}
        >
            <Tooltip label={`${props.value}`}>
                <Box
                    bg={props.color}
                    h="100%"
                    w={(props.size ?? 150) * props.value / 150}
                ></Box>
            </Tooltip>
        </Box>
    )
}