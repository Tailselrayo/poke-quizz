import { useUser } from "@/hooks/useUser";
import { Button, Stack } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter()
    
    useUser(()=>router.push('/session', ));


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