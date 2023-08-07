import { PokemonTypes } from "@/types/PokemonTypes";
import { Group, SimpleGrid, Stack } from "@mantine/core";
import Image from "next/image";

interface TypeDisplayProps {
    types: PokemonTypes[];
}

export function TypeDisplay(props: TypeDisplayProps) {
    const typesNb = props.types.length;
    return (
        <Group>
            <Image src={`/icons/${props.types[0].type.name}.svg`} alt="ticon" width={100} height={100}/>
            <SimpleGrid cols={~~((typesNb-1)/3)}>
                {Array.from({length: typesNb-1}).map((_,index)=>{
                    return(
                        <Image src={`/icons/${props.types[index+1].type.name}.svg`} alt="ticon" width={30} height={30}/>
                    )
                })}
            </SimpleGrid>
        </Group>
    )
}