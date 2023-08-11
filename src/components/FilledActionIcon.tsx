import { ActionIcon, ActionIconProps } from "@mantine/core";
import { ButtonAnimation } from "./ButtonAnimation";

interface FilledActionIconProps extends ActionIconProps {
    onClick?: () => void;
    delay?: number;
}

export function FilledActionIcon(props: FilledActionIconProps) {
    return (
        <ButtonAnimation delay={props.delay}>
            <ActionIcon
                {...props}
                variant="filled"
                className='inner-border'
            />
        </ButtonAnimation>
    )
}