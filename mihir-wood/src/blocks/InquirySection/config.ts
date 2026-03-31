import type { Block } from 'payload'

export const InquirySection: Block = {
    slug: 'inquirySection',
    fields: [
        {
            name: 'title',
            type: 'text',
            defaultValue: 'HAVE SOMETHING IN MIND?',
            label: 'Section Title',
        },
        {
            name: 'variant',
            type: 'select',
            defaultValue: 'default',
            options: [
                { label: 'Default (with Testimonial)', value: 'default' },
                { label: 'Project Quote (Simple Form)', value: 'simple' },
            ],
            admin: {
                description: 'Select the layout style for the inquiry form.',
            },
        },
        {
            name: 'description',
            type: 'textarea',
            defaultValue: 'Whether it is a custom furniture piece for your home or a large-scale project for your business, we are here to help.',
            label: 'Description',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'Background Image',
        },
    ],
    interfaceName: 'InquirySectionBlock',
    labels: {
        plural: 'Inquiry Sections',
        singular: 'Inquiry Section',
    },
}
