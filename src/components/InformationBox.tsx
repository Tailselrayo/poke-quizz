import { IconInfoSquare } from "@tabler/icons-react";
import { FilledActionIcon } from "./FilledActionIcon";

interface InformationBoxProps {

}

export function InformationBox(props: InformationBoxProps) {
    return (

        <FilledActionIcon color="primary" size={60}>
            <IconInfoSquare color="black" size={50} />
        </FilledActionIcon>

    )
}