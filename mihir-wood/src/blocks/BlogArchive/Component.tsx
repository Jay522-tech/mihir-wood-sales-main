import type { BlogArchiveBlock as BlogArchiveProps, Media, Post } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { GridTileImage } from '@/components/Grid/tile'
import Link from 'next/link'
import type { DefaultDocumentIDType } from 'payload'

export const BlogArchive: React.FC<
    BlogArchiveProps & {
        id?: DefaultDocumentIDType
        className?: string
    }
> = async (props) => {
    const { id, limit: limitFromProps, populateBy, selectedPosts, title } = props

    const limit = limitFromProps || 3

    let posts: Post[] = []

    if (populateBy === 'collection') {
        const payload = await getPayload({ config: configPromise })

        const fetchedPosts = await payload.find({
            collection: 'posts',
            depth: 1,
            limit,
            sort: '-publishedAt',
        })

        posts = fetchedPosts.docs
    } else {
        if (selectedPosts?.length) {
            posts = selectedPosts.map((post) => {
                if (typeof post === 'object') return post
            }).filter(Boolean) as Post[]
        }
    }

    return (
        <section className="container pb-4" id={`block-${id}`}>
            {title && <h2 className="mb-8 text-2xl font-bold">{title}</h2>}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                    <Link
                        className="relative block aspect-video h-full w-full"
                        href={`/posts/${post.slug}`}
                        key={index}
                    >
                        <GridTileImage
                            label={{
                                amount: 0,
                                position: 'bottom',
                                title: post.title,
                            }}
                            media={post.featuredImage as Media}
                        />
                    </Link>
                ))}
            </div>
        </section>
    )
}
