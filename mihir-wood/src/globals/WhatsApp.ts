import type { GlobalConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'

export const WhatsApp: GlobalConfig = {
    slug: 'whatsapp',
    label: 'WhatsApp Settings',
    admin: {
        group: 'Settings',
    },
    access: {
        read: () => true,
        update: adminOnly,
    },
    fields: [
        {
            name: 'phoneNumber',
            type: 'text',
            required: true,
            defaultValue: '+919313405709',
            label: 'WhatsApp Phone Number (with country code)',
            admin: {
                description: 'Format: +91XXXXXXXXXX',
            },
        },
        {
            name: 'callToOrderNumber',
            type: 'text',
            defaultValue: '+91 93134 05709',
            label: 'Call to Order Number',
        },
        {
            name: 'defaultMessage',
            type: 'textarea',
            defaultValue: 'Hello, I would like to inquire about your products.',
            label: 'Default Inquiry Message',
        },
        {
            name: 'productInquiryMessage',
            type: 'textarea',
            defaultValue: "Hello, I'm interested in this product: ",
            label: 'Product Inquiry Message (Prefix)',
            admin: {
                description: 'This will be prepended to the product title and link.',
            },
        },
    ],
}
