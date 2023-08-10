import { PokedexCompleteData } from "@/types/PokedexCompleteData";
import { UserInfos } from "@/types/UserInfos";
import { fetchUserPokedex, updateBadges, updateUserAvatar } from "@/utils/supabase";
import { useDisclosure} from "@mantine/hooks";
import { useState, useEffect } from "react";
import { useUser } from "./useUser";

//This function handles badges and PP, but was created for badges and I don't wanna change like 50iterations now
export function useBadges() {

    const {user} = useUser();
    const [currentUser, setCurrentUser] = useState<UserInfos|null>(null)
    const [opened, modalHandlers] = useDisclosure();
    const [userPokedex, setUserPokedex] = useState<PokedexCompleteData[] | null>();
    const [isAvatarSelected, setIsAvatarSelected] = useState(false)
    const [selectedAffix, setSelectedAffix] = useState<number>()

    const onBadgeClick = (affixIndex: number) => {
        setSelectedAffix(affixIndex);
        if (affixIndex > 0) {
            setIsAvatarSelected(false)
        }
        else {
            setIsAvatarSelected(true)
        }
        fetchUserPokedex(user.userId!)
            .then(setUserPokedex)
            .then(modalHandlers.open)
    }

    const onImageSelect = (id: number) => {
        //when badge is updated
        if (!isAvatarSelected) {
            return updateBadges(user.userId!, id, selectedAffix!)
                .then(modalHandlers.close)
        }
        //when avatar is updated
        else {
            return updateUserAvatar(user.userId!, id)
                .then(modalHandlers.close)
        }
    }

    //get user infos if currentUser not setup and userId exists
    useEffect(() => {
        if (!currentUser&&user.userId?.length) {
            setCurrentUser(user.userInfos)
        }
    }, [currentUser])

    return ({
        badges: { opened, userPokedex, selectedAffix, isAvatarSelected },
        badgesHandlers: { onBadgeClick, onImageSelect, closeBadges: modalHandlers.close, openBadges: modalHandlers.open }
    })
}