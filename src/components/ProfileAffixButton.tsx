import { Affix } from "@mantine/core";
import { PlusIcon } from "./PlusIcon";
import { ImagePoke } from "./ImagePoke";
import { Badge } from "@/types/Badge";

interface ProfileAffixButtonProps {
    isOnHome?: boolean;
    badgePoke?: Badge;
    left_pad: number;
    top_pad: number;
    iconSize: number;
    onClick: () => void;
}

export function ProfileAffixButton(props: ProfileAffixButtonProps) {


    const onClick = () => {
        if (props.isOnHome) {
            props.onClick();
        }
    }

    return (
        <Affix
            onClick={onClick}
            position={{ left: props.left_pad, top: props.top_pad }}
            zIndex={1}
        >
            {props.badgePoke ?
                <ImagePoke id={props.badgePoke.pokemon_id} src={process.env.NEXT_PUBLIC_BADGESPRITE_URL} size={props.iconSize}/> :
                <PlusIcon size={props.iconSize} />
            }
        </Affix>
    )
}