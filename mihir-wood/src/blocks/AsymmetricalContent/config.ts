import { link } from '@/fields/link'
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const AsymmetricalContent: Block = {
    slug: 'asymmetricalContent',
    fields: [
        {
            name: 'layout',
            type: 'select',
            defaultValue: 'imageLeft',
            options: [
                { label: 'Image Left', value: 'imageLeft' },
                { label: 'Image Right', value: 'imageRight' },
            ],
            required: true,
        },
        {
            name: 'title',
            type: 'text',
            label: 'Section Title',
            required: true,
        },
        {
            name: 'badge',
            type: 'text',
            label: 'Badge / Subtitle',
        },
        {
            name: 'description',
            type: 'richText',
            editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                ],
            }),
        },
        {
            name: 'mainImage',
            type: 'relationship',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'secondaryImage',
            type: 'relationship',
            relationTo: 'media',
        },
        {
            name: 'enableLink',
            type: 'checkbox',
            defaultValue: false,
        },
        link({
            overrides: {
                admin: {
                    condition: (_: any, { enableLink }: any) => Boolean(enableLink),
                },
            },
        }),
    ],
    interfaceName: 'AsymmetricalContentBlock',
    labels: {
        plural: 'Asymmetrical Content Sections',
        singular: 'Asymmetrical Content Section',
    },
}
