import {Box,  Text } from "@mantine/core";

interface StatBarProps {
    size?: number;
    value: number;
    color: string;
}

export function StatBar(props: StatBarProps) {
    return (
        <Box
            bg="gray.1"
            w={props.size??150}
            h={20}
        >  
            <Box
                bg={props.color}
                w={(props.size??150)*props.value/150}
                h="100%"
            >
                <Text p={0} ta="center" fz={15} c="dark.8">{props.value}</Text>
            </Box>
        </Box>
    )
}