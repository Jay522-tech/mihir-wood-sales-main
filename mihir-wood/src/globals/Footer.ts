import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { link } from '@/fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: adminOnly,
  },
  fields: [
    {
      name: 'logoText',
      type: 'text',
      defaultValue: 'Mihir Wood',
      label: 'Logo Text',
    },
    {
      name: 'tagline',
      type: 'textarea',
      defaultValue: 'Premium teak wood furniture brand for modern homes.',
      label: 'Tagline',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Youtube', value: 'youtube' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '#',
          label: 'URL',
        },
      ],
    },
    {
      name: 'linkGroups',
      type: 'array',
      label: 'Link Groups',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Group Title',
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        {
          name: 'phone',
          type: 'text',
          defaultValue: '+91-152 25 300',
          label: 'Phone Number',
        },
        {
          name: 'website',
          type: 'text',
          defaultValue: 'www.mihirwood.com',
          label: 'Website URL',
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      defaultValue: '© 2026 Mihir Wood Sales. All rights reserved.',
      label: 'Copyright Text',
    },
  ],
}
