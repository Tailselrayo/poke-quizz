import { ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

interface PlusIconProps {
    onClick?: () => void;
    size: number;
}

export function PlusIcon(props: PlusIconProps) {
    return (
        <ActionIcon radius="xl" bg="yellow" size={props.size}>
            <IconPlus color="white" size={props.size} />
        </ActionIcon>
    )
}