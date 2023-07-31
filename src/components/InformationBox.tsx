import { ActionIcon, Stack } from "@mantine/core";
import { IconInfoSquare } from "@tabler/icons-react";

interface InformationBoxProps {

}

export function InformationBox(props: InformationBoxProps) {
    return (

        <ActionIcon c="primary" size={50}>
            <IconInfoSquare size={50} />
        </ActionIcon>

    )
}