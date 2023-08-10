import { UserInfos } from "@/types/UserInfos"
import { getUser, getUserInfos } from "@/utils/supabase"
import { useState, useEffect } from "react"

export function useUser(onSuccess?: () => void, onFail?: () => void) {
    const [userId, setUserId] = useState<string | null>(null)
    const [userInfos, setUserInfos] = useState<UserInfos | null>(null)
    const [wasChecked, setWasChecked] = useState<boolean>(false)
    const [wasExtracted, setWasExtracted] = useState<boolean>(false)

    const updateUserInfos = () => {
        getUserInfos(userId!)
            .then((data) => setUserInfos(data?.[0]) );
    }

    //get userId from supabase
    useEffect(() => {
        if (!wasChecked) {
            setWasChecked(true);
            if (!userId) {
                getUser().then((data) => {
                    if (data?.user) {
                        setUserId(data.user.id)
                        onSuccess?.();
                    }
                    else {
                        onFail?.();
                    }
                })
            }
        }
    }, [userId, wasChecked])

    //get userInfos after userId has been initialized
    useEffect(() => {
        if (userId) {
            if (!wasExtracted && !userInfos) {
                setWasExtracted(true);
                updateUserInfos();
            }
        }
    })

    return ({
        user: { userId, userInfos },
        userHandlers: {updateUserInfos}
    })
}