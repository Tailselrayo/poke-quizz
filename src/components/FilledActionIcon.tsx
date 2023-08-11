import { ActionIcon, ActionIconProps } from "@mantine/core";

interface FilledActionIconProps extends ActionIconProps{
    onClick?: ()=>void;
}

export function FilledActionIcon(props: FilledActionIconProps) {
    return(
        <ActionIcon 
            {...props}
            variant="filled"
            className='inner-border'
        />
    )
}