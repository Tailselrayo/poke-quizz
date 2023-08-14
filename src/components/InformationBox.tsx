import { IconInfoSquare } from "@tabler/icons-react";
import { FilledActionIcon } from "./FilledActionIcon";

interface InformationBoxProps {
    onClick: () => void;
}

export function InformationBox(props: InformationBoxProps) {
    return (
        <FilledActionIcon onClick={props.onClick} color="primary" size={60}>
            <IconInfoSquare color="black" size={50} />
        </FilledActionIcon>
    )
}