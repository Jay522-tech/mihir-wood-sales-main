import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { link } from '@/fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: adminOnly,
  },
  fields: [
    {
      name: 'promotionText',
      label: 'Promotion Text',
      type: 'text',
      admin: {
        description: 'Text to display in the top announcement bar',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
}
