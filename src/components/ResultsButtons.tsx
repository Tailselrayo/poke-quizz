import { Group, Button } from "@mantine/core";
import Link from "next/link";
import { ButtonAnimation } from "./ButtonAnimation";

interface ResultsButtonsProps { }

export function ResultsButtons(props: ResultsButtonsProps) {
    return (
        <Group w="100%" grow spacing={2}>
            <ButtonAnimation >
                <Link href="/game" style={{ display: "block", width: "100%" }}>
                    <Button w="100%" color="primary">
                        Play Again
                    </Button>
                </Link>
            </ButtonAnimation>
            <ButtonAnimation>
                <Link href="/session" style={{ display: "block", width: "100%" }}>
                    <Button w="100%" color="secondary">
                        Home
                    </Button>
                </Link>
            </ButtonAnimation>
            <ButtonAnimation>
                <Link href="/pokedex" style={{ display: "block", width: "100%" }}>
                    <Button w="100%" color="tertiary">
                        Pokedex
                    </Button>
                </Link>
            </ButtonAnimation>
        </Group>
    )
}