import { UserInfos } from "@/types/UserInfos";
import { registerWithEmail, signInWithEmail, signOut } from "@/utils/supabase";
import { useLocalStorage, useDisclosure, useInputState } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { useBadges } from "./useBadges";
import { useRouter } from "next/router";

export function useLogReg() {
    const [currentUser, setCurrentUser] = useLocalStorage<UserInfos|null>({ key: "pokemonCurUser", defaultValue: null })
    const [email, setEmail] = useInputState("")
    const [username, setUsername] = useInputState("")
    const [password, setPassword] = useInputState("")
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [isLogError, setIsLogError] = useState<boolean>(false);
    const [isRegError, setIsRegError] = useState<boolean>(false);
  
    const onSubmit = async () => {
      
        if (!isLogin) {
            registerWithEmail("azerty@gmail.com", "Test", "azerty123")
            //createUser(value);
        }
        signInWithEmail("qwerty@gmail.com", "qwerty123")
      
      if (isLogin) {
        setIsLogError(true)
      }
      else {
        setIsRegError(true)
      }
    }
  
    const resetErrors = () => {
      if (isLogError || isRegError) {
        setIsLogError(false);
        setIsRegError(false);
      }
    }
  
  
    //Reset modal errors
    useEffect(resetErrors,[email, password])

    return ({
        values: {email, username, password, isLogin, isLogError, isRegError},
        logRegHandlers: {setEmail, setUsername, setPassword, setIsLogin, onSubmit },
    })
}