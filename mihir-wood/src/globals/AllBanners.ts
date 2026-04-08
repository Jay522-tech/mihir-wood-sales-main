import { GlobalConfig } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const AllBanners: GlobalConfig = {
    slug: 'all-banners',
    label: 'All Banners',
    admin: {
        group: 'Settings',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Home Page Hero',
                    fields: [
                        {
                            name: 'homeHero',
                            type: 'group',
                            label: false,
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
                                },
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
                        },
                    ],
                },
                {
                    label: 'Bulk Order Banner',
                    fields: [
                        {
                            name: 'bulkOrder',
                            type: 'group',
                            label: false,
                            fields: [
                                {
                                    name: 'title',
                                    type: 'text',
                                    defaultValue: 'TRANSFORM YOUR SPACE',
                                    label: 'Banner Title (White Text)',
                                },
                                {
                                    name: 'highlightText',
                                    type: 'text',
                                    defaultValue: 'AT SCALE',
                                    label: 'Highlighted Text (Gold Text)',
                                },
                                {
                                    name: 'description',
                                    type: 'textarea',
                                    defaultValue: 'Mihir Wood provides premium bespoke furniture for offices, hotels, and luxury residences. Experience uncompromising quality and timeless wood craftsmanship.',
                                    label: 'Description',
                                },
                                {
                                    name: 'image',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: 'Background Image',
                                    required: true,
                                },
                                linkGroup(),
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}
