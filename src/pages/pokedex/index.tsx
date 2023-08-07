import { PokedexModal } from "@/components/PokedexModal";
import { ProfilePicture } from "@/components/ProfilePicture";
import { PokedexCompleteData } from "@/types/PokedexCompleteData";
import { PokemonWiki } from "@/types/PokemonWiki";
import { UserInfos } from "@/types/UserInfos";
import { sumFromNbList } from "@/utils/sumList";
import { fetchUserPokedex } from "@/utils/supabase";
import { Affix, Group, Pagination, SimpleGrid, Stack, Tabs, Text } from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { IconQuestionMark } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Pokedex() {
    const [currentUser] = useLocalStorage<UserInfos | null>({ key: "pokemonCurUser", defaultValue: null })
    const [pokedex, setPokedex] = useState<PokedexCompleteData[] | null>(null)
    //Dynamic refresh
    const [selectedGen, setSelectedGen] = useState(1);
    const [selectedPage, setSelectedPage] = useState(1);
    //Fetch and transfert of selected pokemon data
    const [selectedPoke, setSelectedPoke] = useState<PokedexCompleteData>();
    const [selectedPokeWiki, setSelectedPokeWiki] = useState<PokemonWiki>();
    //pokedex modal handler
    const [opened, modalHandlers] = useDisclosure();

    const genSizes = [151, 100, 135, 113, 92, 72, 88, 96, 105] //9 generations in
    const pokemonPerPage = 20;

    const onPokemonClick = (pokemon: PokedexCompleteData) => {
        setSelectedPoke(pokemon);
        fetch(`${process.env.NEXT_PUBLIC_POKEAPI_URL}${pokemon["poke-id"]}`)
            .then((request) => request.json())
            .then(setSelectedPokeWiki)
            .then(modalHandlers.open)
    }

    //reset pagination selected on gen change
    useEffect(() => {
        setSelectedPage(1)
        console.log(pokedex)
    }, [selectedGen])

    //fetch all pokedex data for curUser
    useEffect(() => {
        if (currentUser?.id && !pokedex) {
            fetchUserPokedex(currentUser.id).then(setPokedex);
        }
    }, [currentUser, pokedex])

    return (
        <>
            {(selectedPoke && selectedPokeWiki) ?
                <PokedexModal
                    opened={opened}
                    pokemonSummary={selectedPoke}
                    pokemonWiki={selectedPokeWiki}
                    onClose={modalHandlers.close}
                /> : <></>
            }
            <Stack w="100%" spacing={3}>
                <Group h={100} position="apart">
                    <ProfilePicture size={100} />
                    <Text className="text-shadow">{currentUser?.username}'s Pokedex</Text>
                </Group>
                <Tabs defaultValue="g1">
                    <Tabs.List onClick={() => console.log(genSizes.slice(0, selectedGen - 1))} position="center">
                        {Array.from({ length: 9 }).map((_, index) => {
                            return (
                                <Tabs.Tab
                                    key={index}
                                    onClick={() => setSelectedGen(index + 1)}
                                    value={`g${index + 1}`}
                                    px="xs"
                                >
                                    Gen.{index + 1}
                                </Tabs.Tab>
                            )
                        })}
                    </Tabs.List>
                    <Tabs.Panel value={`g${selectedGen}`}>
                        <Stack align="center">
                            <SimpleGrid cols={5}>
                                {Array.from({ length: pokemonPerPage }).map((_, index2) => {
                                    const pokemonId = index2 + 1 + pokemonPerPage * (selectedPage - 1) + sumFromNbList(genSizes.slice(0, selectedGen - 1))
                                    const pokeData = pokedex?.find((pokemon) => pokemon["poke-id"] === pokemonId);
                                    if (pokemonId <= sumFromNbList(genSizes.slice(0, selectedGen))) {
                                        return (
                                            <>
                                                {pokeData?.xp ?
                                                    <Image
                                                        key={index2}
                                                        onClick={() => onPokemonClick(pokeData)}
                                                        src={`${process.env.NEXT_PUBLIC_POKESPRITE_URL}${pokemonId}.png`}
                                                        alt={`${pokemonId}`}
                                                        height={100}
                                                        width={100}
                                                    /> :
                                                    <IconQuestionMark key={index2} color="white" size={100} />}
                                            </>
                                        )
                                    }
                                })}
                            </SimpleGrid>
                        </Stack>
                    </Tabs.Panel>
                </Tabs>
            </Stack>
            <Affix w="100%" position={{ bottom: 0 }} zIndex={1}>
                <Stack p="sm" align="center" justify="end">
                    <Pagination
                        value={selectedPage}
                        onChange={setSelectedPage}
                        total={Math.ceil(Math.ceil(genSizes[selectedGen - 1] / pokemonPerPage))}
                        withControls={false}
                        withEdges={false}
                    />
                </Stack>
            </Affix>
        </>
    )
}
