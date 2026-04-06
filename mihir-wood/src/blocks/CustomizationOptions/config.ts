import type { Block } from 'payload'

export const CustomizationOptions: Block = {
    slug: 'customizationOptions',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'CUSTOMIZATION AVAILABLE',
        },
        {
            name: 'subtitle',
            type: 'text',
            defaultValue: 'Customize every detail to create interiors that are uniquely yours.',
        },
        {
            name: 'options',
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
    ],
    interfaceName: 'CustomizationOptionsBlock',
}
