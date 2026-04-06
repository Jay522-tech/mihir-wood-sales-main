import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const HowItWorks: Block = {
    slug: 'howItWorks',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'How it Works',
        },
        {
            name: 'subtitle',
            type: 'text',
            defaultValue: "Here's How We Bring Your Dream Space to Life",
        },
        {
            name: 'steps',
            type: 'array',
            minRows: 1,
            maxRows: 3,
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'description',
                    type: 'textarea',
                    required: true,
                },
            ],
        },
        {
            name: 'contactText',
            type: 'text',
            defaultValue: 'Call Us +91-9314444747',
        },
    ],
    interfaceName: 'HowItWorksBlock',
}
