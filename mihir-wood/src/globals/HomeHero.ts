import { GlobalConfig } from 'payload'

export const HomeHero: GlobalConfig = {
    slug: 'home-hero',
    admin: {
        group: 'Config',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            defaultValue: 'Premium Woodwork for Large-Scale Projects.',
            label: 'Hero Title',
        },
        {
            name: 'subTitle',
            type: 'text',
            defaultValue: 'SCALE WITHOUT COMPROMISE.',
            label: 'Hero Sub-Title',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'Hero Background Image',
            required: true,
        },
        {
            name: 'links',
            type: 'array',
            label: 'Hero Buttons',
            fields: [
                {
                    name: 'link',
                    type: 'group',
                    fields: [
                        {
                            name: 'label',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'url',
                            type: 'text',
                            required: true,
                        },
                    ],
                },
            ],
        },
    ],
}
