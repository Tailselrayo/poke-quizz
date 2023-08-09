import { ImageSelectModal } from '@/components/ImageSelectModal'
import { InformationBox } from '@/components/InformationBox'
import { ProfilePicture } from '@/components/ProfilePicture'
import { useBadges } from '@/hooks/useBadges'
import { useLogReg } from '@/hooks/useLogReg'
import { UserInfos } from '@/types/UserInfos'
import { ActionIcon, Affix, Button, Group, Stack } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { Session, createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { IconLogout, IconUser } from '@tabler/icons-react'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'

interface HomeProps {
  initialSession: Session|null;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createPagesServerClient(context)
  const data = await supabase.auth.getSession()
  return ({
    props: {
      initialSession: data,
    }
  })
}

export default function Home(props: HomeProps) {
  const [currentUser] = useLocalStorage<UserInfos>({ key: "pokemonCurUser" });
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
        <ActionIcon onClick={()=>{}} color="yellow" size={50}>
            <IconLogout color="yellow" size={50} />
        </ActionIcon>
      </Affix>
    </>
  )
}
