import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import { ActionIcon, Group, Modal, Stack, Title, Text, List } from "@mantine/core";
import { IconSquareX, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

interface InformationBoxModalProps {
    opened: boolean;
    onClose: () => void;
}

export function InformationBoxModal(props: InformationBoxModalProps) {
    const [embla, setEmbla] = useState<Embla | null>(null)

    useAnimationOffsetEffect(embla, 300)

    return (
        <Modal.Root opened={props.opened} onClose={props.onClose} size="xl">
            <Modal.Overlay opacity={0.8} />
            <Modal.Content>
                <Modal.Body
                    bg="dark.6"
                    style={{ borderStyle: "solid", borderWidth: 4, borderColor: "white" }}
                    p="md"
                >
                    <Stack>
                        <Group position="right">
                            <Title ta="center" w="100%" fz="md">
                                Poké-Quizz : How to play
                            </Title>
                            <ActionIcon pos="fixed" onClick={props.onClose} size={50}>
                                <IconSquareX color="white" fill="red" size={500} />
                            </ActionIcon>
                        </Group>
                        <Carousel
                            controlsOffset="xs"
                            getEmblaApi={setEmbla}
                            styles={{ control: { '&[data-inactive]': { opacity: 0, cursor: 'default' } } }}
                        >
                            <Carousel.Slide>
                                <Stack>
                                    <Text ta="center" fz="sm">Game Overview</Text>
                                    <Stack align="center" p="xs" spacing="sm">
                                        <Image
                                            src="/information/game-overview.png"
                                            alt="overview"
                                            height={250}
                                            width={500}
                                        />
                                        <Text ta="justify" fz="xs">
                                            The goal is to anwser "who's that pokemon" kind of questions, either from the pokemon's picture, or its name
                                        </Text>
                                    </Stack>
                                </Stack>
                            </Carousel.Slide>
                            <Carousel.Slide>
                                <Stack>
                                    <Text ta="center" fz="sm">Gameplay</Text>
                                    <Group noWrap h="100%" p="xs" align="start">
                                        <Stack>
                                            <Image
                                                src="/information/question.png"
                                                alt="question"
                                                height={280}
                                                width={250}
                                            />
                                        </Stack>
                                        <Stack align="center">
                                            <List listStyleType="none" ta="justify" fz="xs" c="white">
                                                <List.Item>- You have 10s to answer a question</List.Item>
                                                <List.Item>- The faster you are, the more pts you earn</List.Item>
                                                <List.Item>- If you answer wrongly or the time runs out, you lose a life</List.Item>
                                                <List.Item>- If you lose all your 3 lives, you lose</List.Item>
                                                <List.Item>- Answer 20 questions without depleting your lives and you win</List.Item>
                                            </List>
                                            <Image
                                                src="/information/lifebar.png"
                                                alt="lifebar"
                                                height={50}
                                                width={150}
                                            />
                                        </Stack>
                                    </Group>
                                </Stack>
                            </Carousel.Slide>
                            <Carousel.Slide>
                                <Stack>
                                    <Text ta="center" fz="sm">Bonuses & Questions' Pool</Text>
                                    <Group noWrap p="xs">
                                        <Image
                                            src="/information/bonuses.png"
                                            alt="bonuses"
                                            height={150}
                                            width={75}
                                        />
                                        <List listStyleType="none" ta="justify" c="white" fz="xs">
                                            <List.Item>You get 2 bonuses each games which can be used only once :</List.Item>
                                            <List.Item>- Skip/Change question : You can use it to skip a question you don't know the answer to and get a new, random one</List.Item>
                                            <List.Item>- 50/50 : Use it to get rid of two wrong answers from the 4 usual choices</List.Item>
                                        </List>
                                    </Group>
                                    <Group noWrap p="xs">
                                        <Text ta="justify" fz="xs">
                                            You can select the generations you want to play with by clicking the following icon on your page :
                                        </Text>
                                        <Image
                                            src="/information/gen-selection.png"
                                            alt="gen-select"
                                            height={75}
                                            width={75}
                                        />
                                    </Group>
                                </Stack>
                            </Carousel.Slide>
                            <Carousel.Slide>
                                <Stack>
                                    <Text ta="center" fz="sm">End Screen</Text>
                                    <Stack align="center" spacing="sm">
                                        <Text ta="justify" fz="xs">
                                            When game ends, you are sent to this screen which sumarizes your game :
                                        </Text>
                                        <Image
                                            src="/information/end-screen.png"
                                            alt="end screen"
                                            height={250}
                                            width={500}
                                        />
                                        <Text ta="justify" fz="xs">
                                            From there, you can checkout your pokedex, go to your home page or play again !
                                        </Text>
                                    </Stack>
                                </Stack>
                            </Carousel.Slide>
                        </Carousel>
                    </Stack>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    )
}