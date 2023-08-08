import { Stack, Text, Box, Group } from "@mantine/core";
import { StatBar } from "./StatBar";
import { getStatColorFromName } from "@/utils/getStatColorFromName";
import { getStatLabel } from "@/utils/getStatLabel";


interface StatTextProps {
    isColorTooBright?: boolean;
    name: string;
    value: number;
}

export function StatText(props: StatTextProps) {
    return (
        <>
            <Group w="100%" position="apart">
                <Text fz={15} color={props.isColorTooBright?"black":"white2"}>
                    {getStatLabel(props.name)}
                </Text>
                <StatBar value={props.value} color={getStatColorFromName(props.name)} size={75}/>
            </Group>
        </>
    )
}