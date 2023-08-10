import { registerWithEmail, signInWithEmail, signOut } from "@/utils/supabase";
import { useInputState } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export function useLogReg() {
  const [email, setEmail] = useInputState("")
  const [username, setUsername] = useInputState("")
  const [password, setPassword] = useInputState("")
  const [confirmPassword, setConfirmPassword] = useInputState("");
  const [arePWEq, setArePWEq] = useState<boolean>(true);
  const [isPWError, setIsPWError] = useState<boolean>(false);
  const [isLogError, setIsLogError] = useState<boolean>(false);
  const [isRegError, setIsRegError] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = async (isLogin?:boolean) => {
    //check if in register mode
    if (!isLogin) {
      if (await regVerification()) {
        console.log("registration successful")
      }
    }
    else {
      if (await logVerification()) {
        router.push('/session')
      }
    }
  }

  //handling of registration possible errors
  const regVerification =  async () => {
     //check if pw and cpw are the same
     if (password.trim().length===0||password!==confirmPassword) {
      setArePWEq(false);
      return false;
    }
    //check if email as an account already
    const error = (await registerWithEmail(email, username, password))?.error
    console.log(error?.message);

    if(error) {
      setIsRegError(true);
      return false;
    }
    return true;
  }

  //handlingof login possible errors
  const logVerification = async () => {
    //check of email is correct (aka exists) and / or pw is correct
    const error = (await signInWithEmail(email, password))?.error
    console.log(error?.message)
    if (error) {
      setIsLogError(true);
      return false;
    }
    return true;
  }

  const resetErrors = () => {
    if (isLogError || isRegError || isPWError || !arePWEq) {
      setIsLogError(false);
      setIsRegError(false);
      setArePWEq(true);
      setIsPWError(false);
    }
  }


  //Reset modal errors
  useEffect(resetErrors, [email, password, confirmPassword])

  return ({
    values: { email, username, password,  isLogError, isRegError, arePWEq, confirmPassword, isPWError },
    logRegHandlers: { setEmail, setUsername, setPassword,  onSubmit, setConfirmPassword },
  })
}