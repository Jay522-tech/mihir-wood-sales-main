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

const Page = async () => {
    let page = await queryPage('bulk') // Try 'bulk' slug from DB
    if (!page) {
        page = await queryPage('bulk-orders') // Fallback to 'bulk-orders'
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
