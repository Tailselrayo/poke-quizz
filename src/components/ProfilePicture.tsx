import { Affix, Avatar, Box } from "@mantine/core";
import { PlusIcon } from "./PlusIcon";

interface ProfilePictureProps {
    size: number;
}

export function ProfilePicture(props: ProfilePictureProps) {
    const affixMarginY = props.size/5;
    const iconSize = props.size/6;
    const padding = 16;
    return (
        <Box h={props.size} w={props.size}>
            <Avatar src="/LuigiPP.webp" alt="an avatar" w="100%" h="100%" />
            <Affix position={{left:padding, top: padding+props.size-affixMarginY}}>
                <PlusIcon size={iconSize}/>
            </Affix>
            <Affix position={{left:padding+(props.size-iconSize)/2, top:padding+props.size-iconSize/2 }}>
                <PlusIcon size={iconSize}/>
            </Affix>
            <Affix position={{left: padding+props.size-iconSize, top: padding+props.size-affixMarginY}}>
                <PlusIcon size={iconSize}/>
            </Affix>
        </Box>
    )
}