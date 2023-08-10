import { GensSelectionModal } from '@/components/GensSelectorModal'
import { ImageSelectModal } from '@/components/ImageSelectModal'
import { InformationBox } from '@/components/InformationBox'
import { ProfilePicture } from '@/components/ProfilePicture'
import { useBadges } from '@/hooks/useBadges'
import { useUser } from '@/hooks/useUser'
import { signOut } from '@/utils/supabase'
import { ActionIcon, Affix, Button, Group, Loader, Stack } from '@mantine/core'
import { useDisclosure, useLocalStorage } from '@mantine/hooks'
import { IconLogout, IconSettings } from '@tabler/icons-react'
import Link from 'next/link'
import router from 'next/router'

export default function Home() {
  //store difficulty selection
  const [selectedGens, setSelectedGens] = useLocalStorage<number[]>({key: "genStorage", defaultValue: [1]})
  const [opened, modalHandlers] = useDisclosure();
  //hook getting user id
  const {user, userHandlers} = useUser(()=>{}, ()=>router.push('/'));
  //hook handling badges
  const { badges, badgesHandlers } = useBadges()

  const onImageSelect = (id: number) => {
    badgesHandlers.onImageSelect(id)
    .then(userHandlers.updateUserInfos);
  }

  const onSignOut = () => {
    signOut()
    .then(()=>router.push("/"))
  }

  if (!user?.userId?.length) {
    return <Loader></Loader>
  }
  return (
    <>
      {badges.userPokedex ?
        <ImageSelectModal
          opened={badges.opened}
          userPokedex={badges.userPokedex}
          onClose={badgesHandlers.closeBadges}
          onImageSelect={onImageSelect}
          isAvatar={badges.isAvatarSelected}
        /> :
        <></>
      }
      <GensSelectionModal 
        opened={opened}
        curSelection={selectedGens}
        onClose={modalHandlers.close}
        onSave={setSelectedGens}
      />
      <Stack p={0}>
        <Group w="100%" position="apart" align="start" p={0}>
          <ProfilePicture
            size={200}
            onBadgeClick={badgesHandlers.onBadgeClick}
            isOnHome={true}
            userInfos={user.userInfos} />
          <InformationBox />
        </Group>
        <Stack w="40%" mx="auto" align="center" spacing={2}>
          <Link href="/game" style={{ display: "block", width: "100%" }}>
            <Button w="100%" color="secondary">Play</Button>
          </Link>
          <Group w="100%" spacing={2} grow>
            <Button color="tertiary" disabled>Shop</Button>
            <Button color="primary" disabled>Vote</Button>
          </Group>
          <Link href="/pokedex" style={{ display: "block", width: "100%" }}>
            <Button w="100%" color="primary">Pokedex</Button>
          </Link>
        </Stack>
      </Stack>
      <Affix position={{ right: 0, bottom: 0 }} p="xs" zIndex={1}>
        <ActionIcon onClick={onSignOut} color="yellow" size={50}>
            <IconLogout color="yellow" size={50} />
        </ActionIcon>
      </Affix>
      <Affix position={{ left: 0, bottom: 0 }} p="xs" zIndex={1}>
        <ActionIcon onClick={modalHandlers.open} color="white" size={50}>
            <IconSettings color="white " size={50} />
        </ActionIcon>
      </Affix>
    </>
  )
}
