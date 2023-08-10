import { Button, Group, PasswordInput, Stack, TextInput, Title, Text } from "@mantine/core";
import Link from "next/link";
import { FormEvent} from "react";

interface LogRegWindowProps {
    isLogin?: boolean;
    isLogError?: boolean;
    isRegError?: boolean;
    isPWError?: boolean;
    arePWEq?: boolean;
    username?: string;
    email: string;
    password: string;
    confirmPassword?: string;
    setEmail: (value: string) => void;
    setUsername: (value: string) => void;
    setPassword: (value: string) => void;
    setConfirmPassword?: (value: string)=> void;
    onSubmit: () => void;
}

export function LogRegWindow(props: LogRegWindowProps) {

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        props.onSubmit();
    
    }

    return (
        <Stack w="50%" mx="auto" align="center" bg="dark.8" p="sm" style={{ borderStyle: "solid", borderRadius: 30 }}>
            <form onSubmit={onSubmit} autoComplete="off">
                <Stack align="center">
                    <Stack spacing="xs">
                        <Title ta="center" p="sm">Enter your{props.isLogin ? " login " : " "}informations</Title>
                        <TextInput
                            //className="logreg-text-input"
                            placeholder="youradress@yourmail"
                            label={<Text fz="xs">email</Text>}
                            value={props.email}
                            onChange={(e) => props.setEmail(e.target.value)}
                            error={props.isLogError?"Wrong email":(props.isRegError?"Email already have an account":"")}
                        />
                        <TextInput
                            label={<Text fz="xs">username</Text>}
                            display={props.isLogin ? "none" : "block"}
                            value={props.username}
                            onChange={(e) => props.setUsername(e.target.value)}
                            placeholder="Ex: SonicDu72"
                        />
                        <PasswordInput
                            label={<Text fz="xs">password</Text>}
                            value={props.password}
                            onChange={(e) => props.setPassword(e.target.value)}
                            error={!props.arePWEq?"The fields must have the same passwords":(props.isPWError?"Wrong password":"")}
                        />
                        <PasswordInput
                            display={props.isLogin ? "none" : ""}
                            label={<Text fz="xs">confirm password</Text>}
                            value={props.confirmPassword}
                            onChange={(e)=>props.setConfirmPassword!(e.target.value)}
                            error={!props.arePWEq}
                        />
                    </Stack>
                    <Group w="100%" position="apart">
                        <Link href={props.isLogin ? "/register" : "/login"} style={{ textDecoration: "none" }}>
                            <Text fz="xs" color="blue.6" ta="center">{props.isLogin ? "register" : "login"}</Text>
                        </Link>
                        <Button type="submit" color="primary" >Submit</Button>
                    </Group>
                </Stack>
            </form>
        </Stack>
    )
}