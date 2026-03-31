import { linkGroup } from '@/fields/linkGroup'
import { GlobalConfig } from 'payload'

export const BulkOrder: GlobalConfig = {
    slug: 'bulk-order',
    admin: {
        group: 'Config',
    },
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
}
