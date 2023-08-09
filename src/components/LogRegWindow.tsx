import { Button, PasswordInput, Stack,  TextInput, Title } from "@mantine/core";
import { FormEvent } from "react";

interface LogRegWindowProps {
    isLogin?: boolean;
    isLogError?: boolean;
    isRegError?: boolean;
    username: string;
    email: string;
    password: string;
    setEmail: (value: string) => void;
    setUsername: (value: string) => void;
    setPassword: (value: string) => void;
    onSubmit: () => void;
}

export function LogRegWindow(props: LogRegWindowProps) {

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        props.onSubmit();
    }

    return (
        <form onSubmit={onSubmit}>
            <Stack align="center">
                <Stack>
                    <Title>Enter your{props.isLogin?" login ":" "}informations</Title>
                    <TextInput 
                        label="email"
                        value={props.email}
                        onChange={(e)=>props.setEmail(e.target.value)}
                    />
                    <TextInput
                        label="username"
                        display={props.isLogin?"none":"block"}
                        value={props.username}
                        onChange={(e) => props.setUsername(e.target.value)}
                        placeholder="Ex: SonicDu72"
                    />
                    <PasswordInput
                        label="password"
                        value={props.password}
                        onChange={(e) => props.setPassword(e.target.value)}
                    />
                </Stack>
                <Button type="submit" color="primary" >Submit</Button>
            </Stack>
        </form>
    )
}