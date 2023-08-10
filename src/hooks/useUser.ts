import { getUser } from "@/utils/supabase"
import { useState, useEffect } from "react"

export function useUser(onSuccess?: () => void, onFail?: () => void) {
    const [userId, setUserId] = useState<string | null>(null)
    const [wasChecked, setWasChecked] = useState<boolean>(false)


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

    return ({
        userId: userId
    })
}