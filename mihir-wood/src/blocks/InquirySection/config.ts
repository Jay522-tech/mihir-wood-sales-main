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
        {
            name: 'mapUrl',
            type: 'text',
            label: 'Google Map Embed URL',
            admin: {
                description: 'Enter the Google Maps embed URL to show a map instead of the image (Only works with "Project Quote" variant).'
            }
        },
        {
            name: 'testimonial',
            type: 'group',
            label: 'Testimonial (Default Variant Only)',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    label: 'Name',
                    defaultValue: 'Priya Sharma',
                },
                {
                    name: 'role',
                    type: 'text',
                    label: 'Role/Title',
                    defaultValue: 'Verified Customer',
                },
                {
                    name: 'text',
                    type: 'textarea',
                    label: 'Testimonial Text',
                    defaultValue: '"Our custom teak bed is a masterpiece! The craftsmanship is truly world-class."',
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'Customer Photo',
                },
            ],
            admin: {
                condition: (data, siblingData) => data?.variant === 'default',
            }
        }
    ],
    interfaceName: 'InquirySectionBlock',
    labels: {
        plural: 'Inquiry Sections',
        singular: 'Inquiry Section',
    },
}
