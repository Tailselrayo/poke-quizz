import { Avatar } from "@mantine/core";
import Image from "next/image";

interface ImagePokeProps {
    id: number;
    src: string;
    onClick?: ()=>void;
    size?: number;
}

export function ImagePoke(props: ImagePokeProps) {
    const isAvatar = props.src===process.env.NEXT_PUBLIC_POKESPRITE_URL;
    return (
        <Avatar 
            className={props.id>0?"pointer":""}
            onClick={props.onClick}
            miw={0}
            w={props.size??50} 
            h={props.size??50} 
            variant="filled" 
            color="dark"
            radius="xl"
            style={{borderStyle: "solid", borderWidth: 1, borderColor: "yellow"}}
        >
            {props.id>0?
            <Image 
                src={`${props.src}${props.id}.png`} 
                alt={`Badge ${props.id}`} 
                width={props.size?props.size*(isAvatar?1:1.6):80}
                height={props.size?props.size*(isAvatar?1:1.6):80}
            />:
            <></>}
        </Avatar>
    )
}