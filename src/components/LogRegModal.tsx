import { User } from "@/types/User";
import { verifyUser } from "@/utils/supabase";
import { Button, Modal, Stack, Tabs, TextInput } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { FormEvent, useEffect, useState } from "react";

interface LogRegModalProps {
    opened: boolean;
    value: string;
    isLogError: boolean;
    isRegError: boolean;
    onClose: () => void;
    setValue: (value: string) => void;
    onSubmit: () => void;
    setIsLogin: (isLogin: boolean) => void;
}

export function LogRegModal(props: LogRegModalProps) {

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        props.onSubmit();
    }

    return (
        <Modal
            opened={props.opened}
            onClose={props.onClose}
            title={"Identify yourself"}
            styles={(theme) => ({
                content: { backgroundColor: theme.colors.secondary },
                header: { backgroundColor: theme.colors.primary, justifyContent: "center" }
            })}
        >
            <form onSubmit={onSubmit}>
                <Stack align="center">
                    <Tabs defaultValue={"login"}>
                        <Tabs.List >
                            <Tabs.Tab onClick={() => props.setIsLogin(true)} value="login">Login</Tabs.Tab>
                            <Tabs.Tab onClick={() => props.setIsLogin(false)} value="register">Register</Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="login">
                            <TextInput
                                className="border"
                                c="tertiary"
                                value={props.value}
                                onChange={(e) => props.setValue(e.target.value)}
                                error={props.isLogError ? "Username doens't exist !" : ""}
                                placeholder="Ex: SonicDu72"
                            />
                        </Tabs.Panel>
                        <Tabs.Panel value="register">
                            <TextInput
                                value={props.value}
                                onChange={(e) => props.setValue(e.target.value)}
                                error={props.isRegError ? "Username already exist !" : ""}
                                placeholder="Ex: SonicDu72"
                            />
                        </Tabs.Panel>
                    </Tabs>
                    <Button type="submit" color="primary" >Submit</Button>
                </Stack>
            </form>
        </Modal>
    )
}