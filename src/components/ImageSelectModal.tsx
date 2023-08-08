import { PokedexCompleteData } from "@/types/PokedexCompleteData";
import { Group, Modal, Text, Stack, Title, Button, ActionIcon } from "@mantine/core";
import { ImageSelector } from "./ImageSelector";
import { IconSquareX } from "@tabler/icons-react";

interface ImageSelectModalProps {
    isAvatar?: boolean;
    opened: boolean;
    userPokedex: PokedexCompleteData[];
    onClose: () => void;
    onImageSelect: (id: number) => void;
}

export function ImageSelectModal(props: ImageSelectModalProps) {
    return (
        <Modal.Root
            opened={props.opened}
            onClose={props.onClose}
            size="xl"
            radius="lg"
        >
            <Modal.Overlay opacity={0.8} />
            <Modal.Content style={{ borderStyle: "solid", borderWidth: 2, borderColor: props.isAvatar?"red":"green" }}>
                <Modal.Body bg="dark.8">
                    <Stack>
                        <Group position="right">
                            <Title w="100%"  ta="center" color="gray.1">
                                {props.isAvatar?"SELECT AN AVATAR":"SELECT A BADGE"}
                            </Title>
                            <ActionIcon onClick={props.onClose} size={70} style={{position: "absolute"}}>
                                <IconSquareX color="white" fill="red" size={70}/>
                            </ActionIcon>
                        </Group>
                        <ImageSelector 
                            userPokedex={props.userPokedex} 
                            onImageSelect={props.onImageSelect} 
                            isAvatar={props.isAvatar}
                        />
                    </Stack>
                </Modal.Body>
            </Modal.Content>


        </Modal.Root>
    )
}