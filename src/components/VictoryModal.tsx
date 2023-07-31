import { Modal } from "@mantine/core";

interface VictoryModalProps {
    opened: boolean;
    onClose: () => void;
}

export function VictoryModal(props: VictoryModalProps) {

    return(
        <Modal
            opened={props.opened}
            onClose={props.onClose}
            title="Congrats, you won !"
        >

        </Modal>
    )
}