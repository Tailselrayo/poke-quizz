import { verifyUser, createUser } from "@/utils/supabase";
import { useLocalStorage, useDisclosure, useInputState } from "@mantine/hooks";
import { useState, useEffect } from "react";

export function useLogReg() {
    const [currentUser, setCurrentUser] = useLocalStorage({ key: "pokemonCurUser", defaultValue: "" })
    const [opened, modalHandlers] = useDisclosure();
    const [value, setValue] = useInputState("")
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [isLogError, setIsLogError] = useState<boolean>(false);
    const [isRegError, setIsRegError] = useState<boolean>(false);
  
    const onSubmit = async () => {
      if (await verifyUser(value, isLogin)) {
        createUser(value);
        setCurrentUser(value);
        modalHandlers.close();
        setValue("");
      }
      else if (isLogin) {
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
  
    const handleLogClick = () => {
      if (!currentUser) {
        modalHandlers.open();
      }
      else {
        setCurrentUser("")
      }
    }
  
    //Reset modal errors
    useEffect(resetErrors,[value])

    return ({
        values: {value, opened, isLogin, isLogError, isRegError},
        logRegHandlers: {handleLogClick, setValue, closeModal: modalHandlers.close, setIsLogin, onSubmit },
    })
}