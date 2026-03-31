import type { Block } from 'payload'

export const ManufacturingProcess: Block = {
    slug: 'manufacturingProcess',
    fields: [
        {
            name: 'title',
            type: 'text',
            defaultValue: 'Our Craftsmanship Process',
            label: 'Section Title',
        },
        {
            name: 'subtitle',
            type: 'text',
            defaultValue: 'FROM VISION TO REALITY.',
            label: 'Subtitle',
        },
        {
            name: 'steps',
            type: 'array',
            label: 'Process Steps',
            minRows: 1,
            maxRows: 4,
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    label: 'Step Title',
                },
                {
                    name: 'description',
                    type: 'textarea',
                    required: false,
                    label: 'Step Description',
                },
                {
                    name: 'icon',
                    type: 'select',
                    label: 'Icon',
                    options: [
                        { label: 'Trees', value: 'trees' },
                        { label: 'PenTool', value: 'pentool' },
                        { label: 'Hammer', value: 'hammer' },
                        { label: 'Truck', value: 'truck' },
                    ],
                }
            ],
        },
    ],
    interfaceName: 'ManufacturingProcessBlock',
    labels: {
        plural: 'Manufacturing Process Sections',
        singular: 'Manufacturing Process Section',
    },
}
