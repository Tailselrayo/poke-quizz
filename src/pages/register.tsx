import { LogRegWindow } from "@/components/LogRegWindow";
import { useLogReg } from "@/hooks/useLogReg";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";


export default function Register() {
    const router = useRouter()
    const {values, logRegHandlers} = useLogReg();
    
    useUser(()=>router.push('/session'));

    return (
        <LogRegWindow 
            email={values.email}
            username={values.username}
            password={values.password}
            confirmPassword={values.confirmPassword}
            isRegError={values.isRegError}
            arePWEq={values.arePWEq}
            setEmail={logRegHandlers.setEmail}
            setUsername={logRegHandlers.setUsername}
            setPassword={logRegHandlers.setPassword}
            setConfirmPassword={logRegHandlers.setConfirmPassword}
            onSubmit={logRegHandlers.onSubmit}
        />
    )
}