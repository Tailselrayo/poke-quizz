import { InformationBox } from '@/components/InformationBox'
import { ProfilePicture } from '@/components/ProfilePicture'
import { User } from '@/types/User'
import { createUser } from '@/utils/supabase'
import { ActionIcon, Affix, Button, Group, Stack } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { IconLogout, IconUser } from '@tabler/icons-react'
import Link from 'next/link'

export default function Home() {
  const [currentUser, setCurrentUser] = useLocalStorage<User|null>({key: "pokemonCurUser", defaultValue: null})

  const handleLogClick = () => {
    console.log(createUser("Tailselrayo"));
  }

  return (
    <>
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
      <Affix position={{ right: 0, bottom: 0 }} p="xs">
        <ActionIcon onClick={handleLogClick} color="yellow" size={50}>
          {!currentUser?
          <IconUser color="yellow" size={50} />:
          <IconLogout color="yellow" size={50}/>}
        </ActionIcon>
      </Affix>
    </>
  )
}
