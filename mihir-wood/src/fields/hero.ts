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
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Slider',
          value: 'slider',
        },
        {
          label: 'Haveli',
          value: 'haveli',
        },
      ],
      required: true,
    },
    {
      name: 'subTitle',
      type: 'text',
      label: 'Sub Title',
      admin: {
        condition: (_, { type } = {}) => !['none', 'slider'].includes(type),
      },
    },
    {
      name: 'richText',
      type: 'richText',
      admin: {
        condition: (_, { type } = {}) => !['none', 'slider'].includes(type),
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
          condition: (_, { type } = {}) => !['none', 'slider'].includes(type),
        },
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'speed',
      type: 'number',
      defaultValue: 1,
      label: 'Auto-Scroll Speed',
    },
    {
      name: 'slides',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => type === 'slider',
      },
      fields: [
        {
          name: 'subTitle',
          type: 'text',
          label: 'Sub Title',
        },
        {
          name: 'richText',
          type: 'richText',
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
        linkGroup({
          overrides: {
            maxRows: 2,
          },
        }),
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      minRows: 1,
    },
  ],
  label: false,
}
