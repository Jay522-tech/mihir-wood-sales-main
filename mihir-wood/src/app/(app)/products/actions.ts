'use server'

import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'

export async function submitReviewAction(formData: FormData) {
    const payload = await getPayload({ config: configPromise })

    try {
        const productId = formData.get('productId') as string
        const rating = Number(formData.get('rating'))
        const customerName = formData.get('customerName') as string
        const content = formData.get('content') as string
        const files = formData.getAll('files') as File[]

        if (!productId || !rating || !customerName || !content) {
            throw new Error('Missing required fields')
        }

        // 1. Upload Media
        const imageIds: string[] = []
        let videoId: string | undefined = undefined

        for (const file of files) {
            if (!file.name || file.size === 0) continue

            const mediaDoc = await payload.create({
                collection: 'media',
                data: {
                    alt: `Review image for product ${productId}`,
                },
                file: {
                    data: Buffer.from(await file.arrayBuffer()),
                    name: file.name,
                    mimetype: file.type,
                    size: file.size,
                },
            })

            if (file.type.startsWith('video/')) {
                videoId = mediaDoc.id
            } else {
                imageIds.push(mediaDoc.id)
            }
        }

        // 2. Create Review
        await payload.create({
            collection: 'reviews',
            data: {
                product: productId,
                rating,
                customerName,
                content,
                images: imageIds.length > 0 ? imageIds : undefined,
                video: videoId,
            },
        })

        revalidatePath(`/products/${productId}`)
        return { success: true }
    } catch (error: any) {
        console.error('Action error:', error)
        return { success: false, error: error.message || 'Failed to submit review' }
    }
}
