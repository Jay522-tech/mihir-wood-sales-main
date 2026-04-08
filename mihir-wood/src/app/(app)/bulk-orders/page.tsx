import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

export async function generateMetadata(): Promise<Metadata> {
    let page = await queryPage('bulk')
    if (!page) {
        page = await queryPage('bulk-orders')
    }

    return generateMeta({ doc: page || {} })
}

const queryPage = async (slug: string) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'pages',
        draft,
        limit: 1,
        where: {
            slug: {
                equals: slug,
            },
        },
    })

    return result.docs?.[0] || null
}

import { defaultBulkOrdersPage } from '../page-fallback'

const Page = async () => {
    const payload = await getPayload({ config: configPromise })
    let page = await queryPage('bulk') // Try 'bulk' slug from DB
    if (!page) {
        page = await queryPage('bulk-orders') // Fallback to 'bulk-orders'
    }

    if (!page) {
        // Use fallback if page not found in DB
        page = JSON.parse(JSON.stringify(defaultBulkOrdersPage)) as any

        try {
            const allBannersGlobal = await (payload as any).findGlobal({
                slug: 'all-banners',
            })

            if (allBannersGlobal?.bulkOrder && page?.hero) {
                const bulkHero = allBannersGlobal.bulkOrder
                page.hero.type = 'banner'
                page.hero.slides = [
                    {
                        title: bulkHero.title,
                        subTitle: bulkHero.subTitle || 'PREMIUM FURNITURE FOR EVERY SPACE',
                        image: bulkHero.image,
                        links: bulkHero.links,
                        contentAlignment: 'center',
                    }
                ]
            }
        } catch (error) {
            console.error('Failed to fetch all-banners for bulk-orders fallback:', error)
        }
    }

    if (!page) {
        return notFound()
    }

    return (
        <article className="">
            <RenderHero {...page.hero as any} />
            <RenderBlocks blocks={page.layout as any} />
        </article>
    )
}

export default Page
