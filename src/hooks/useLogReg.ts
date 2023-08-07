import { UserInfos } from "@/types/UserInfos";
import { verifyUser, createUser, getUserInfos } from "@/utils/supabase";
import { useLocalStorage, useDisclosure, useInputState } from "@mantine/hooks";
import { useState, useEffect } from "react";

export function useLogReg() {
    const [currentUser, setCurrentUser] = useLocalStorage<UserInfos|null>({ key: "pokemonCurUser", defaultValue: null })
    const [opened, modalHandlers] = useDisclosure();
    const [value, setValue] = useInputState("")
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [isLogError, setIsLogError] = useState<boolean>(false);
    const [isRegError, setIsRegError] = useState<boolean>(false);
  
    const onSubmit = async () => {
      if (await verifyUser(value, isLogin)) {
        if (!isLogin) {
            createUser(value);
        }
        setCurrentUser((await getUserInfos(value)).data?.[0]);
        closeModal();
      }
      else if (isLogin) {
        setIsLogError(true)
      }
      else {
        setIsRegError(true)
      }
    }

    const closeModal = () => {
        modalHandlers.close();
        setValue("");
    }
  
    const resetErrors = () => {
      if (isLogError || isRegError) {
        setIsLogError(false);
        setIsRegError(false);
      }
    }
  
    const handleLogClick = () => {
      if (!currentUser) {
        modalHandlers.open();
      }
      else {
        setCurrentUser(null)
      }
    }
  
    //Reset modal errors
    useEffect(resetErrors,[value])

    return ({
        values: {value, opened, isLogin, isLogError, isRegError},
        logRegHandlers: {handleLogClick, setValue, closeModal, setIsLogin, onSubmit },
    })
}