import type { Block } from 'payload'

export const StoreArchive: Block = {
    slug: 'storeArchive',
    interfaceName: 'StoreArchiveBlock',
    fields: [
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'stores',
            type: 'relationship',
            relationTo: 'stores',
            hasMany: true,
        },
    ],
    labels: {
        plural: 'Store Archives',
        singular: 'Store Archive',
    },
}
