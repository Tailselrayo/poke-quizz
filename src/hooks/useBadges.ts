import { Badge } from "@/types/Badge";
import { PokedexCompleteData } from "@/types/PokedexCompleteData";
import { UserInfos } from "@/types/UserInfos";
import { fetchUserPokedex, addOrUpdateBadge, fetchUserBadges, updateUserAvatar, getUserInfos } from "@/utils/supabase";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { useState, useEffect } from "react";

//This function handles badges and PP, but was created for badges and I don't wanna change like 50iterations now
export function useBadges() {
    const [currentUser, setCurrentUser] = useLocalStorage<UserInfos | null>({ key: "pokemonCurUser", defaultValue: null })
    const [opened, modalHandlers] = useDisclosure();
    const [userPokedex, setUserPokedex] = useState<PokedexCompleteData[] | null>();
    const [isAvatarSelected, setIsAvatarSelected] = useState(false)
    const [selectedAffix, setSelectedAffix] = useState<number>()
    const [badges, setBadges] = useState<Badge[] | null>(null)

    const onBadgeClick = (affixIndex: number) => {
        setSelectedAffix(affixIndex);
        if (affixIndex > 0) {
            setIsAvatarSelected(false)
        }
        else {
            setIsAvatarSelected(true)
        }
        fetchUserPokedex(currentUser!.id)
            .then(setUserPokedex)
            .then(modalHandlers.open)
    }

    const onImageSelect = (id: number) => {
        //when badge is updated
        if (!isAvatarSelected) {
            addOrUpdateBadge(currentUser!.id, id, selectedAffix!)
                .then(modalHandlers.close)
                .then(() => updateBadge(currentUser!))
        }
        //when avatar is updated
        else {
            updateUserAvatar(currentUser!.id, id)
                .then(modalHandlers.close)
                .then(() => updateBadge(currentUser!))
        }
    }

    const updateBadge = (user: UserInfos | null) => {
        if (user) {
            if (!isAvatarSelected) {
                fetchUserBadges(user.id).then(setBadges)
            }
            else {
                getUserInfos(currentUser!.username).then((data)=>setCurrentUser(data?.[0]))
            }
        }
    }
    //change badges on userChange
    useEffect(() => {
        if (currentUser?.id) {
            updateBadge(currentUser)
        }
    }, [currentUser])

    return ({
        badges: { badges, opened, userPokedex, selectedAffix, isAvatarSelected },
        badgesHandlers: { onBadgeClick, onImageSelect, updateBadge, closeBadges: modalHandlers.close, openBadges: modalHandlers.open }
    })
}