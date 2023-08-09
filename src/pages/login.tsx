import { LogRegWindow } from "@/components/LogRegWindow";
import { useLogReg } from "@/hooks/useLogReg";

export default function Login() {
    const {values, logRegHandlers} = useLogReg()


    return (
        <LogRegWindow
            isLogin
            email={values.email}
            username={values.username}
            password={values.password}
            isLogError={values.isLogError}
            onSubmit={logRegHandlers.onSubmit}
            setEmail={logRegHandlers.setEmail}
            setUsername={logRegHandlers.setUsername}
            setPassword={logRegHandlers.setPassword}
        />
    )
}