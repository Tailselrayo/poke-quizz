import { ImageSelectModal } from '@/components/ImageSelectModal'
import { InformationBox } from '@/components/InformationBox'
import { LogRegModal } from '@/components/LogRegModal'
import { ProfilePicture } from '@/components/ProfilePicture'
import { useBadges } from '@/hooks/useBadges'
import { useLogReg } from '@/hooks/useLogReg'
import { UserInfos } from '@/types/UserInfos'
import { ActionIcon, Affix, Button, Group, Stack } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { IconLogout, IconUser } from '@tabler/icons-react'
import Link from 'next/link'


export default function Home() {
  const [currentUser] = useLocalStorage<UserInfos>({ key: "pokemonCurUser" });
  //hook handling log and reg
  const { values, logRegHandlers } = useLogReg();
  //hook handling badges
  const { badges, badgesHandlers } = useBadges()

  return (
    <>
      {badges.userPokedex ?
        <ImageSelectModal
          opened={badges.opened}
          userPokedex={badges.userPokedex}
          onClose={badgesHandlers.closeBadges}
          onImageSelect={badgesHandlers.onImageSelect}
          isAvatar={badges.isAvatarSelected}
        /> :
        <></>
      }
      <LogRegModal
        opened={values.opened}
        value={values.value}
        isLogError={values.isLogError}
        isRegError={values.isRegError}
        onClose={logRegHandlers.closeModal}
        onSubmit={logRegHandlers.onSubmit}
        setIsLogin={logRegHandlers.setIsLogin}
        setValue={logRegHandlers.setValue}
      />

      <Stack p={0}>
        <Group w="100%" position="apart" align="start" p={0}>
          <ProfilePicture
            size={200}
            onBadgeClick={badgesHandlers.onBadgeClick}
            isOnHome={true}
            badges={badges.badges} />
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
        <ActionIcon onClick={logRegHandlers.handleLogClick} color="yellow" size={50}>
          {!currentUser ?
            <IconUser color="yellow" size={50} /> :
            <IconLogout color="yellow" size={50} />}
        </ActionIcon>
      </Affix>
    </>
  )
}
