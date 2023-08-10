import { Box } from "@mantine/core";
import { ProfileAffixButton } from "./ProfileAffixButton";
import { ImagePoke } from "./ImagePoke";
import { UserInfos } from "@/types/UserInfos";


interface ProfilePictureProps {
    isOnHome?: boolean;
    userInfos: UserInfos | null;
    size: number;
    onBadgeClick: (affixIndex: number) => void;
}

export function ProfilePicture(props: ProfilePictureProps) {
    const user = props.userInfos;
    const affixMarginY = props.size / 5;
    const iconSize = props.size / 6;
    const padding = 16;

    return (
        <Box h={props.size} w={props.size}>
            <ImagePoke id={user?.avatar??0} src={process.env.NEXT_PUBLIC_POKESPRITE_URL} size={props.size} onClick={()=>props.onBadgeClick(0)}/>
            <ProfileAffixButton
                left_pad={padding}
                top_pad={padding + props.size - affixMarginY}
                iconSize={iconSize}
                onClick={() => props.onBadgeClick(1)}
                isOnHome={props.isOnHome}
                badgePoke={user?.badge_1}
            />
            <ProfileAffixButton
                left_pad={padding + (props.size - iconSize) / 2}
                top_pad={padding + props.size - iconSize / 2}
                iconSize={iconSize}
                onClick={() => props.onBadgeClick(2)}
                isOnHome={props.isOnHome}
                badgePoke={user?.badge_2}
            />
            <ProfileAffixButton
                left_pad={padding + props.size - iconSize}
                top_pad={padding + props.size - affixMarginY}
                iconSize={iconSize}
                onClick={() => props.onBadgeClick(3)}
                isOnHome={props.isOnHome}
                badgePoke={user?.badge_3}
            />
        </Box>
    )
}