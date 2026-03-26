import { getCachedGlobal } from '@/utilities/getGlobals'

import './index.css'
import { HeaderClient } from './index.client'
import { AnnouncementBar } from '../AnnouncementBar'

export async function Header() {
  const header = await getCachedGlobal('header', 1)()

  return (
    <>
      <AnnouncementBar />
      <HeaderClient header={header} />
    </>
  )
}
