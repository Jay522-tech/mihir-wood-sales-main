import type { GlobalConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'

export const Contact: GlobalConfig = {
    slug: 'contact',
    admin: {
        group: 'Settings',
    },
    access: {
        read: () => true,
        update: adminOnly,
    },
    fields: [
        {
            name: 'phone',
            type: 'text',
            defaultValue: '+91 93134 05709',
            label: 'Default Phone Number',
        },
        {
            name: 'address',
            type: 'textarea',
            defaultValue: '123 SG Highway, \n Ahmedabad, Gujarat 380001',
            label: 'Default Address',
        },
        {
            name: 'timing',
            type: 'textarea',
            defaultValue: 'Mon - Sat \n 10:00 AM - 08:00 PM',
            label: 'Default Shop Timing',
        },
        {
            name: 'mapUrl',
            type: 'text',
            label: 'Default Google Map Embed URL',
            defaultValue: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14767.43615438883!2d70.784561!3d22.2847118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca196580983d%3A0x399859f77f52ca3!2sMihir%20Wood%20Sale!5e0!3m2!1sen!2sin!4v1711974797089!5m2!1sen!2sin',
            admin: {
                description: 'This map URL will be used across the site if not overridden.'
            }
        },
    ],
}
