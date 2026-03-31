import type { Block } from 'payload'

export const FeatureGrid: Block = {
    slug: 'featureGrid',
    fields: [
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'subtitle',
            type: 'text',
        },
        {
            name: 'features',
            type: 'array',
            fields: [
                {
                    name: 'icon',
                    type: 'select',
                    options: [
                        { label: 'Shield', value: 'shield' },
                        { label: 'Award', value: 'award' },
                        { label: 'Star', value: 'star' },
                        { label: 'Check', value: 'check' },
                        { label: 'Globe', value: 'globe' },
                        { label: 'Bed (Hotel)', value: 'bed' },
                        { label: 'Briefcase (Office)', value: 'briefcase' },
                        { label: 'Utensils (Cafe)', value: 'utensils' },
                        { label: 'Home (Villas)', value: 'home' },
                        { label: 'Pen Tool (Design)', value: 'pentool' },
                        { label: 'Dollar (Pricing)', value: 'dollar' },
                        { label: 'Hammer (Production)', value: 'hammer' },
                        { label: 'Clock (Delivery)', value: 'clock' },
                    ],
                },
                {
                    name: 'title',
                    type: 'text',
                },
                {
                    name: 'description',
                    type: 'textarea',
                },
            ],
        },
        {
            name: 'variant',
            type: 'select',
            defaultValue: 'default',
            options: [
                { label: 'Default (1+2)', value: 'default' },
                { label: 'Service Cards (4 Columns)', value: 'cards' },
                { label: 'Why Choose Us (Background Image)', value: 'whyChooseUs' },
            ],
        },
        {
            name: 'isDark',
            type: 'checkbox',
            defaultValue: false,
            label: 'Dark Mode / Background Image',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
        },
    ],
    interfaceName: 'FeatureGridBlock',
}
