import { Group, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface ImageSelectorArrowsProps {
    currentPage: number;
    totPages: number;
    canGoNext: boolean;
    canGoPrev: boolean;
    onClickNext: () => void;
    onClickPrev: () => void;
}

export function ImageSelectorArrows(props: ImageSelectorArrowsProps) {

    const onClickNext = () => {
        if (props.canGoNext) {
            props.onClickNext()
        }
    }
    const onClickPrev = () => {
        if (props.canGoPrev) {
            props.onClickPrev();
        }
    }

    return (
        <Group align="apart">
            <IconChevronLeft
                className={props.canGoPrev ? "pointer" : ""}
                onClick={onClickPrev}
                color={props.canGoPrev ? "white" : "dark.8"}
            />
            <Text color="white">{props.currentPage}/{props.totPages}</Text>
            <IconChevronRight
                className={props.canGoNext ? "pointer" : ""}
                onClick={onClickNext}
                color={props.canGoNext ? "white" : "dark.8"}
            />
        </Group>
    )
}