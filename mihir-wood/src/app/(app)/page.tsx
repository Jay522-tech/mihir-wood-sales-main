import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function HomePage() {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'pages',
        where: {
            slug: {
                equals: 'home',
            },
        },
        limit: 1,
    })

    const homePage = result.docs?.[0]

    if (!homePage) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
                    Home page not found. Please create a page with slug "home" in the CMS.
                </p>
            </div>
        )
    }

    return (
        <article className="pt-20">
            <RenderHero {...homePage.hero} />
            <RenderBlocks blocks={homePage.layout || []} />
        </article>
    )
}

export { generateMetadata } from './[slug]/page'
