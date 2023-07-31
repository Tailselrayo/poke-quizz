import { Modal } from "@mantine/core";

interface DefeatModalProps {
    opened: boolean;
    onClose: () => void;
}

export function DefeatModal(props: DefeatModalProps) {
    return(
        <Modal
            opened={props.opened}
            onClose={props.onClose}
            title="You lost :( !"
        >

        </Modal>
    )
}