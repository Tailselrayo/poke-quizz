import { PokedexCompleteData } from "@/types/PokedexCompleteData";
import { PokemonWiki } from "@/types/PokemonWiki";
import { Group, Modal, Progress, Text, Stack } from "@mantine/core";
import Image from "next/image";
import { StatDisplay } from "./StatDisplay";
import { TypeDisplay } from "./TypeDisplay";

interface PokedexModalProps {
    opened: boolean;
    pokemonSummary: PokedexCompleteData;
    pokemonWiki: PokemonWiki;
    onClose: () => void;
}

export function PokedexModal(props: PokedexModalProps) {
    const infos = props.pokemonSummary;
    const wiki = props.pokemonWiki;

    return (
        <Modal
            opened={props.opened}
            onClose={props.onClose}
            styles={(theme) => ({
                content: { backgroundColor: theme.colors.green },
                header: { backgroundColor: theme.colors.lime, justifyContent: "center" },
            })}
            title={`${infos.pokemon} (${infos["poke-id"]})`}
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
                <StatDisplay stats={wiki.stats} />
            </Stack>

        </Modal>
    )
}