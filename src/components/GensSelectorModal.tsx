import { Button, Group, Modal, SimpleGrid, Stack, Title } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { ButtonAnimation } from "./ButtonAnimation";

interface GenSelectorModalProps {
    opened: boolean;
    curSelection: number[];
    onClose: () => void;
    onSave: (newSelection: number[]) => void;
}

export function GensSelectionModal(props: GenSelectorModalProps) {
    const [activeSelection, handlers] = useListState<number>(props.curSelection)

    const onGenClick = (buttonIndex: number) => {
        if (activeSelection.includes(buttonIndex)) {
            if (activeSelection.length === 1) {
                return;
            }
            handlers.filter((elem) => elem !== buttonIndex);
        }
        else {
            handlers.append(buttonIndex)
        }
    }

    const onCancel = () => {
        props.onClose();
        handlers.setState(props.curSelection)
    }

    const onSave = (newSelection: number[]) => {
        props.onClose();
        props.onSave(newSelection);
    }

    return (
        <Modal.Root opened={props.opened} onClose={props.onClose} size="xl">
            <Modal.Overlay opacity={0.8} />
            <Modal.Content bg="teal.8">
                <Modal.Body py="sm" px="lg">
                    <Stack w="100%" align="center">
                        <Title ta="center">Choose the generations you want to play with</Title>
                        <SimpleGrid w="100%" cols={3} spacing="xs">
                            {Array.from({ length: 9 }).map((_, index) => {
                                return (
                                    <ButtonAnimation key={index}>
                                        <Button
                                            w="100%"
                                            key={index}
                                            onClick={() => onGenClick(index + 1)}
                                            color={activeSelection.includes(index + 1) ? "green.5" : "gray.5"}
                                        >
                                            {index + 1}
                                        </Button>
                                    </ButtonAnimation>
                                )
                            })}
                        </SimpleGrid>
                        <Group w="100%" grow>
                            <ButtonAnimation>
                                <Button
                                    onClick={onCancel}
                                    color="secondary"
                                >Cancel</Button>
                            </ButtonAnimation>
                            <ButtonAnimation>
                                <Button
                                    onClick={() => onSave(activeSelection)}
                                    color="primary"
                                >Save</Button>
                            </ButtonAnimation>
                        </Group>
                    </Stack>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    )
}