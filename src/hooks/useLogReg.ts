import { UserInfos } from "@/types/UserInfos";
import { verifyUser, createUser, getUserInfos } from "@/utils/supabase";
import { useLocalStorage, useDisclosure, useInputState } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { useBadges } from "./useBadges";

export function useLogReg() {
    const [currentUser, setCurrentUser] = useLocalStorage<UserInfos|null>({ key: "pokemonCurUser", defaultValue: null })
    const [opened, modalHandlers] = useDisclosure();
    const [value, setValue] = useInputState("")
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [isLogError, setIsLogError] = useState<boolean>(false);
    const [isRegError, setIsRegError] = useState<boolean>(false);
    //badges hook for update on login change
    const {badgesHandlers} = useBadges()
  
    const onSubmit = async () => {
      if (await verifyUser(value, isLogin)) {
        if (!isLogin) {
            createUser(value);
        }
        (getUserInfos(value))
        .then((data)=>setCurrentUser(data?.[0]))
        setTimeout(()=>badgesHandlers.updateBadge(currentUser!), 1000)
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