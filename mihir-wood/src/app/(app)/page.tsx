import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { defaultHomePage } from './page-fallback'

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

    let homePage = result.docs?.[0] as any

    if (!homePage) {
        // Deep clone so we can inject dynamic data into the fallback
        homePage = JSON.parse(JSON.stringify(defaultHomePage))

        try {
            const categoriesResult = await payload.find({
                collection: 'categories',
                limit: 6,
                depth: 1,
                sort: 'createdAt', // Or any other sort order
            })

            if (categoriesResult.docs.length > 0) {
                // Find the categoryCircles block and inject the real categories
                const catBlock = homePage?.layout?.find((b: any) => b.blockType === 'categoryCircles')
                if (catBlock) {
                    catBlock.selectedCategories = categoriesResult.docs
                }
            }

            // 2. Fetch Bulk Order Global and inject into banner
            const bulkOrderGlobal = await (payload as any).findGlobal({
                slug: 'bulk-order',
            })

            if (bulkOrderGlobal) {
                const bulkBlock: any = homePage?.layout?.find((b: any) => b.blockType === 'bulkOrderBanner')
                if (bulkBlock) {
                    bulkBlock.title = bulkOrderGlobal.title
                    bulkBlock.highlightText = bulkOrderGlobal.highlightText
                    bulkBlock.description = bulkOrderGlobal.description
                    bulkBlock.image = bulkOrderGlobal.image
                    bulkBlock.links = bulkOrderGlobal.links
                }
            }

            // 3. Fetch Home Hero Global and inject into hero
            const homeHeroGlobal = await (payload as any).findGlobal({
                slug: 'home-hero',
            })

            if (homeHeroGlobal && homePage?.hero) {
                homePage.hero.type = 'banner'

                let slideRichText = null;
                if (homeHeroGlobal.title) {
                    slideRichText = {
                        root: {
                            type: 'root',
                            children: [
                                {
                                    type: 'heading',
                                    tag: 'h1',
                                    children: [{ type: 'text', version: 1, text: homeHeroGlobal.title }],
                                    version: 1,
                                },
                            ],
                            version: 1,
                        },
                    }
                }

                homePage.hero.slides = [
                    {
                        title: homeHeroGlobal.title,
                        subTitle: homeHeroGlobal.subTitle,
                        image: homeHeroGlobal.image,
                        links: homeHeroGlobal.links,
                        contentAlignment: homeHeroGlobal.contentAlignment || 'left',
                        richText: slideRichText,
                    }
                ]
            }

            // 2. Fetch real products for the productSection
            const productsResult = await payload.find({
                collection: 'products',
                limit: 8,
                sort: '-createdAt',
            })

            if (productsResult.docs.length > 0) {
                const productBlock = homePage?.layout?.find((b: any) => b.blockType === 'productSection')
                if (productBlock) {
                    productBlock.selectedProducts = productsResult.docs
                }
            }
        } catch (error) {
            console.error('Failed to fetch dynamic data for homepage fallback:', error)
        }
    }

    return (
        <article>
            <RenderHero {...(homePage.hero || {})} />
            <RenderBlocks blocks={homePage.layout || []} />
        </article>
    )
}

export { generateMetadata } from './[slug]/page'
