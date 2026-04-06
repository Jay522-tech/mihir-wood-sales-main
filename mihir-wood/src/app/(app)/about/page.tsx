import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { defaultAboutPage } from '../page-fallback'

export async function generateMetadata(): Promise<Metadata> {
    const page = await queryPage('about')

    if (!page) {
        return {}
    }

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
    const page = await queryPage('about')

    const pageData = page || defaultAboutPage

    if (!pageData) {
        return notFound()
    }

    return (
        <article>
            <RenderHero {...(pageData.hero as any)} />
            <RenderBlocks blocks={pageData.layout as any} />
        </article>
    )
}

export default Page
