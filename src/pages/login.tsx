import { LogRegWindow } from "@/components/LogRegWindow";
import { useLogReg } from "@/hooks/useLogReg";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();
    const {values, logRegHandlers} = useLogReg()
    
    useUser(()=>router.push('/session'));

    return (
        <LogRegWindow
            isLogin
            email={values.email}
            username={values.username}
            password={values.password}
            isLogError={values.isLogError}
            isPWError={values.isPWError}
            onSubmit={()=>logRegHandlers.onSubmit(true)}
            setEmail={logRegHandlers.setEmail}
            setUsername={logRegHandlers.setUsername}
            setPassword={logRegHandlers.setPassword}
        />
    )
}