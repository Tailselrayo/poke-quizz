import { InformationBox } from '@/components/InformationBox'
import { ProfilePicture } from '@/components/ProfilePicture'
import { Button, Group, Stack } from '@mantine/core'
import Link from 'next/link'

export default function Home() {
  return (
    <Stack p={0}>
      <Group w="100%" position="apart" align="start" p={0}>
        <ProfilePicture size={200} />
        <InformationBox />
      </Group>
      <Stack w="40%" mx="auto" align="center" spacing={2}>
        <Link href="/game" style={{display: "block", width: "100%"}}>
          <Button w="100%" color="secondary">Play</Button>
        </Link>
        <Group w="100%" spacing={2} grow>
          <Button color="tertiary" disabled>Shop</Button>
          <Button color="primary" disabled>Vote</Button>
        </Group>
      </Stack>
    </Stack>
  )
}
