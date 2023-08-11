"use client"
import { ButtonAnimation } from "@/components/ButtonAnimation";
import { useUser } from "@/hooks/useUser";
import { Button, Stack } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter()

    useUser(() => router.push('/session',));


    return (
        <Stack mx="auto" w="60%" align="center">
            <Image src="/pokemon-logo.png" alt="home-logo" width={700} height={300} />
            <Link href="/login" style={{ flex: "block", width: "100%" }}>
                <ButtonAnimation>
                    <Button color="primary" w="100%">
                        Login
                    </Button>
                </ButtonAnimation>
            </Link>
            <Link href="/register" style={{ flex: "block", width: "100%" }}>
                <ButtonAnimation>
                    <Button color="secondary" w="100%">
                        Register
                    </Button>
                </ButtonAnimation>
            </Link>
        </Stack>
    )
}