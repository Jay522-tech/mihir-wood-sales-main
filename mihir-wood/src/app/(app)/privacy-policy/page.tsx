import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'

export async function generateMetadata(): Promise<Metadata> {
    const page = await queryPage('privacy-policy')
    return {
        title: page?.meta?.title || 'Privacy Policy | Mihir Wood',
        description: page?.meta?.description || 'Our privacy policy outlines how we collect, use, and protect your personal information.',
    }
}

const queryPage = async (slug: string) => {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
        collection: 'pages',
        draft,
        limit: 1,
        where: { slug: { equals: slug } },
    })
    return result.docs?.[0] || null
}

const PrivacyPage = async () => {
    const page = await queryPage('privacy-policy')

    if (!page) {
        return notFound()
    }

    return (
        <article className="!bg-[#FAF9F6] min-h-[80vh] !text-gray-900 py-20 animate-fade-in-up">
            <div className="container max-w-4xl px-4 prose prose-invert:!text-gray-900 prose-headings:!text-black prose-headings:!font-black prose-p:!text-gray-800 prose-li:!text-gray-800 prose-strong:!text-black prose-strong:!font-black">
                <RenderBlocks blocks={page.layout as any} />
            </div>
        </article>
    )
}

export default PrivacyPage
