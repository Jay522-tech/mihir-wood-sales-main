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

            // 2. Fetch All Banners Global and inject into banner
            const allBannersGlobal = await (payload as any).findGlobal({
                slug: 'all-banners',
            })

            if (allBannersGlobal?.bulkOrder) {
                const bulkBlock: any = homePage?.layout?.find((b: any) => b.blockType === 'bulkOrderBanner')
                if (bulkBlock) {
                    bulkBlock.title = allBannersGlobal.bulkOrder.title
                    bulkBlock.highlightText = allBannersGlobal.bulkOrder.highlightText
                    bulkBlock.description = allBannersGlobal.bulkOrder.description
                    bulkBlock.image = allBannersGlobal.bulkOrder.image
                    bulkBlock.links = allBannersGlobal.bulkOrder.links
                }
            }

            // 3. Use Home Hero from All Banners
            if (allBannersGlobal?.homeHero && homePage?.hero) {
                const homeHero = allBannersGlobal.homeHero
                homePage.hero.type = 'banner'

                let slideRichText = null;
                if (homeHero.title) {
                    slideRichText = {
                        root: {
                            type: 'root',
                            children: [
                                {
                                    type: 'heading',
                                    tag: 'h1',
                                    children: [{ type: 'text', version: 1, text: homeHero.title }],
                                    version: 1,
                                },
                            ],
                            version: 1,
                        },
                    }
                }

                homePage.hero.slides = [
                    {
                        title: homeHero.title,
                        subTitle: homeHero.subTitle,
                        image: homeHero.image,
                        links: homeHero.links,
                        contentAlignment: homeHero.contentAlignment || 'left',
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
