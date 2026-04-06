import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from './linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Banner',
          value: 'banner',
        },
      ],
      required: true,
    },
    {
      name: 'subTitle',
      type: 'text',
      label: 'Sub Title',
      admin: {
        condition: (_, { type } = {}) => false,
      },
    },
    {
      name: 'richText',
      type: 'richText',
      admin: {
        condition: (_, { type } = {}) => false,
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        admin: {
          condition: (_, { type } = {}) => false,
        },
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => false,
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'speed',
      type: 'number',
      defaultValue: 1,
      admin: {
        condition: (_, { type } = {}) => ['banner', 'lowImpact'].includes(type),
      },
      label: 'Auto-Scroll Speed',
    },
    {
      name: 'slides',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => ['banner', 'lowImpact'].includes(type),
      },
      fields: [
        {
          name: 'contentAlignment',
          type: 'select',
          label: 'Content Alignment',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
          admin: {
            width: '100%',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              admin: {
                width: '70%',
              },
            },
            {
              name: 'titleColor',
              type: 'text',
              label: 'Title Color',
              defaultValue: '#ffffff',
              admin: {
                width: '30%',
                components: {
                  Field: '@/components/Admin/ColorPicker#ColorPicker',
                },
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'subTitle',
              type: 'text',
              label: 'Sub Title',
              admin: {
                width: '70%',
              },
            },
            {
              name: 'subTitleColor',
              type: 'text',
              label: 'Sub Title Color',
              defaultValue: '#ffffff',
              admin: {
                width: '30%',
                components: {
                  Field: '@/components/Admin/ColorPicker#ColorPicker',
                },
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'richText',
              type: 'richText',
              label: 'Description',
              admin: {
                width: '70%',
              },
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
            },
            {
              name: 'descriptionColor',
              type: 'text',
              label: 'Description Color',
              defaultValue: '#ffffff',
              admin: {
                width: '30%',
                components: {
                  Field: '@/components/Admin/ColorPicker#ColorPicker',
                },
              },
            },
          ],
        },
        linkGroup({
          overrides: {
            maxRows: 2,
          },
        }),
        {
          name: 'image',
          type: 'upload',
          label: 'Background Image',
          relationTo: 'media',
          required: false,
          admin: {
            condition: (data) => ['banner', 'lowImpact'].includes(data?.hero?.type),
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'buttonBackgroundColor',
              type: 'text',
              label: 'Button Background Color',
              defaultValue: '#D4BC9B',
              admin: {
                width: '50%',
                components: {
                  Field: '@/components/Admin/ColorPicker#ColorPicker',
                },
              },
            },
            {
              name: 'buttonTextColor',
              type: 'text',
              label: 'Button Text Color',
              defaultValue: '#000000',
              admin: {
                width: '50%',
                components: {
                  Field: '@/components/Admin/ColorPicker#ColorPicker',
                },
              },
            },
          ],
        },
      ],
      minRows: 1,
    },
  ],
  label: false,
}
