import type { Block } from 'payload'

export const CustomFurniture: Block = {
    slug: 'customFurniture',
    fields: [
        {
            name: 'title',
            type: 'text',
            defaultValue: 'Bespoke Craftsmanship',
            label: 'Section Title',
        },
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Form Settings',
                    fields: [
                        {
                            name: 'formTitle',
                            type: 'text',
                            defaultValue: 'YOUR CHOICE, OUR MASTERY.',
                            label: 'Form Banner Title',
                        },
                        {
                            name: 'formSubtitle',
                            type: 'text',
                            defaultValue: 'Bespoke material and fabric options available.',
                            label: 'Form Banner Subtitle',
                        },
                    ],
                },
                {
                    label: 'Form Steps',
                    fields: [
                        {
                            name: 'steps',
                            type: 'blocks',
                            label: 'Dynamic Form Steps',
                            admin: {
                                initCollapsed: true,
                            },
                            blocks: [
                                {
                                    slug: 'iconGrid',
                                    fields: [
                                        { name: 'stepName', type: 'text', required: true, admin: { description: 'Internal name for this step (e.g. Category, Style)' } },
                                        { name: 'stepTitle', type: 'text', required: true },
                                        { name: 'stepSubtitle', type: 'text' },
                                        {
                                            name: 'options',
                                            type: 'array',
                                            fields: [
                                                { name: 'label', type: 'text', required: true },
                                                { name: 'subLabel', type: 'text' },
                                                { name: 'icon', type: 'text', label: 'Icon Name or Emoji' },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    slug: 'listSelection',
                                    fields: [
                                        { name: 'stepName', type: 'text', required: true, admin: { description: 'Internal name for this step (e.g. Budget, Timeline)' } },
                                        { name: 'stepTitle', type: 'text', required: true },
                                        { name: 'stepSubtitle', type: 'text' },
                                        {
                                            name: 'options',
                                            type: 'array',
                                            fields: [
                                                { name: 'label', type: 'text', required: true },
                                                { name: 'subLabel', type: 'text' },
                                                { name: 'icon', type: 'text', label: 'Icon Name or Emoji' },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    slug: 'rangeSlider',
                                    fields: [
                                        { name: 'stepName', type: 'text', required: true, admin: { description: 'Internal name (e.g. Scale, Units)' } },
                                        { name: 'stepTitle', type: 'text', required: true },
                                        { name: 'stepSubtitle', type: 'text' },
                                        { name: 'suffix', type: 'text', defaultValue: 'units / rooms' },
                                        { name: 'min', type: 'number', defaultValue: 1 },
                                        { name: 'max', type: 'number', defaultValue: 500 }
                                    ]
                                },
                                {
                                    slug: 'contactForm',
                                    fields: [
                                        { name: 'stepName', type: 'text', required: true, defaultValue: 'ContactDetails' },
                                        { name: 'stepTitle', type: 'text', required: true },
                                        { name: 'stepSubtitle', type: 'text' },
                                    ]
                                }
                            ]
                        }
                    ]
                },
            ],
        },
    ],
    interfaceName: 'CustomFurnitureBlock',
    labels: {
        plural: 'Bespoke Design Portals',
        singular: 'Bespoke Design Portal',
    },
}
