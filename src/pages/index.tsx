import { Button, Stack } from "@mantine/core";
import Link from "next/link";

export default function Home() {
    return (
        <Stack align="center">
            <Link href="/login">
                <Button color="primary">
                    Login
                </Button>
            </Link>
            <Link href="/register">
                <Button color="secondary">
                    Register
                </Button>
            </Link>
        </Stack>
    )
}