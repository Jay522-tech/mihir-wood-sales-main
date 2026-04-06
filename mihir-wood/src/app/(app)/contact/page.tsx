import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { defaultContactPage } from '../page-fallback'
import { Phone, MapPin, Clock } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
    const page = await queryPage('contact')

    return generateMeta({ doc: page || defaultContactPage })
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
    const page = await queryPage('contact')
    const pageData = page || defaultContactPage

    const payload = await getPayload({ config: configPromise })
    const contactData = await payload.findGlobal({ slug: 'contact' })

    const blocksWithGlobalData = pageData.layout?.map((block: any) => {
        if (block.blockType === 'inquirySection') {
            return {
                ...block,
                mapUrl: block.mapUrl || contactData.mapUrl,
                variant: block.variant || 'simple',
            }
        }
        if (block.blockType === 'contactInfoGrid') {
            // Only use global data if no items are provided or they match the default/fallback
            const isDefault = !block.items || block.items.length === 0 || block.items[0]?.content.includes('93134')
            if (isDefault) {
                return {
                    ...block,
                    items: [
                        { icon: 'phone', label: 'MOBILE NUMBER', content: contactData.phone },
                        { icon: 'map-pin', label: 'STUDIO ADDRESS', content: contactData.address },
                        { icon: 'clock', label: 'SHOP TIMING', content: contactData.timing },
                    ]
                }
            }
        }
        return block
    })

    return (
        <article>
            <RenderHero {...(pageData.hero as any)} />
            <RenderBlocks blocks={blocksWithGlobalData as any} />
        </article>
    )
}

export default Page
