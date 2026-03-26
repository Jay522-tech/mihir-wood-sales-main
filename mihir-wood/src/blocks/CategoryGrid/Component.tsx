import type { Category, Media, CategoryGridBlock as CategoryGridProps } from '@/payload-types'
import { GridTileImage } from '@/components/Grid/tile'
import Link from 'next/link'
import React from 'react'
import type { DefaultDocumentIDType } from 'payload'

export const CategoryGrid: React.FC<
    CategoryGridProps & {
        id?: DefaultDocumentIDType
        className?: string
    }
> = ({ categories, title }) => {
    if (!categories || categories.length === 0) return null

    return (
        <section className="container pb-4">
            {title && <h2 className="mb-8 text-2xl font-bold">{title}</h2>}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {categories.map((category, index) => {
                    if (typeof category !== 'object') return null

                    return (
                        <Link
                            className="relative block aspect-square h-full w-full"
                            href={`/products?category=${category.slug}`}
                            key={index}
                        >
                            <GridTileImage
                                label={{
                                    amount: 0, // No price for categories
                                    position: 'bottom',
                                    title: category.title,
                                }}
                                media={category.image as Media}
                            />
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
