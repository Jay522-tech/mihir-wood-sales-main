import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

export async function generateMetadata(): Promise<Metadata> {
    const page = await queryPage('bulk-orders')

    return generateMeta({ doc: page })
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
    const page = await queryPage('bulk-orders')

    if (!page) {
        return notFound()
    }

    return (
        <article className="pt-16 pb-24">
            <RenderHero {...page.hero} />
            <RenderBlocks blocks={page.layout} />
        </article>
    )
}

export default Page
