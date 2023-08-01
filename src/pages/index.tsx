import { InformationBox } from '@/components/InformationBox'
import { LogRegModal } from '@/components/LogRegModal'
import { ProfilePicture } from '@/components/ProfilePicture'
import { useLogReg } from '@/hooks/useLogReg'
import { ActionIcon, Affix, Button, Group, Stack } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { IconBook, IconLogout, IconUser } from '@tabler/icons-react'
import Link from 'next/link'

export default function Home() {
  const [currentUser] = useLocalStorage({ key: "pokemonCurUser" });
  const { values, logRegHandlers } = useLogReg();
  return (
    <>
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
          <ProfilePicture size={200} />
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
        </Stack>
      </Stack>
      <Affix position={{ right: 0, bottom: 0 }} p="xs" zIndex={1}>
        <ActionIcon onClick={logRegHandlers.handleLogClick} color="yellow" size={50}>
          {!currentUser ?
            <IconUser color="yellow" size={50} /> :
            <IconLogout color="yellow" size={50} />}
        </ActionIcon>
      </Affix>
      <Affix position={{ left: 0, bottom: 0 }} p="xs" zIndex={1}>
        <Link href="/pokedex">
          <ActionIcon color="primary" size={50}>
            <IconBook size={50} />
          </ActionIcon>
        </Link>
      </Affix>
    </>
  )
}
