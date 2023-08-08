import { PokedexCompleteData } from "@/types/PokedexCompleteData";
import { PokemonWiki } from "@/types/PokemonWiki";
import { Group, Modal, Progress, Text, Stack, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import { StatDisplay } from "./StatDisplay";
import { TypeDisplay } from "./TypeDisplay";
import { getColorsFromTypes } from "@/utils/getColorsFromTypes";

interface PokedexModalProps {
    opened: boolean;
    pokemonSummary: PokedexCompleteData;
    pokemonWiki: PokemonWiki;
    onClose: () => void;
}

export function PokedexModal(props: PokedexModalProps) {
    const infos = props.pokemonSummary;
    const wiki = props.pokemonWiki;
    const typeScheme = getColorsFromTypes(props.pokemonWiki.types)
    const colorTooBright = ["yellow","gray"]
    const colorTooDark = ["dark"]

    return (
        <Modal
            opened={props.opened}
            onClose={props.onClose}
            styles={(theme) => ({
                content: { backgroundColor: theme.colors[`${typeScheme[0]}`][`${typeScheme[2]}`] },
                header: { backgroundColor: theme.colors[`${typeScheme[0]}`][`${typeScheme[1]}`], justifyContent: "center" },
            })}
            title={<Text color={colorTooDark.includes(typeScheme[0])?"white2":""}>{`${infos.pokemon} (${infos["poke-id"]})`}</Text>}
        >
            <Stack>
                <Group w="100%" position="apart">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_POKESPRITE_URL}${infos["poke-id"]}.png`}
                        alt="ppp"
                        height={150}
                        width={150}
                    />
                    <TypeDisplay types={wiki.types} />

                </Group>
                <StatDisplay 
                    stats={wiki.stats} 
                    isColorTooBright={colorTooBright.includes(typeScheme[0])}
                />
            </Stack>

        </Modal>
    )
}