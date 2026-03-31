import { getPayload } from 'payload'
import configPromise from './src/payload.config'

async function updateProducts() {
    console.log('Starting product update...')
    try {
        const payload = await getPayload({ config: configPromise })

        // Fetch all media
        const mediaRes = await payload.find({
            collection: 'media',
            limit: 200
        })

        if (!mediaRes.docs || mediaRes.docs.length === 0) {
            console.log('No media found, cannot assign images.')
            process.exit(0)
        }

        // Filter out bad images
        const goodMedia = mediaRes.docs.filter(m => {
            const fname = m.filename?.toLowerCase() || ''
            return !fname.includes('screenshot') &&
                !fname.includes('gemini') &&
                !fname.includes('1000081') &&
                !fname.includes('photo_')
        })

        if (goodMedia.length === 0) {
            console.log('No good media found!')
            process.exit(0)
        }

        const productsRes = await payload.find({
            collection: 'products',
            limit: 100
        })

        let updatedCount = 0

        for (const product of productsRes.docs) {
            // Pick a random GOOD media item
            const randomMedia = goodMedia[Math.floor(Math.random() * goodMedia.length)]

            await payload.update({
                collection: 'products',
                id: product.id,
                data: {
                    meta: {
                        ...product.meta,
                        image: randomMedia.id
                    }
                }
            })
            console.log(`Updated product ${product.title} with image ${randomMedia.filename}`)
            updatedCount++
        }

        console.log(`Successfully updated ${updatedCount} products with good images.`)
    } catch (e) {
        console.error('Error updating products:', e)
    }
    process.exit(0)
}

updateProducts()
