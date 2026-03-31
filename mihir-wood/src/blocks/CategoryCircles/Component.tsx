import type { Category, CategoryCirclesBlock } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const CategoryCircles: React.FC<CategoryCirclesBlock> = (props) => {
    const { title, selectedCategories } = props

    if (!selectedCategories || selectedCategories.length === 0) return null

    return (
        <section className="bg-[#F9F7F2] py-12 md:py-16">
            <div className="container px-4">
                {title && (
                    <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-10 md:mb-14 tracking-tight">
                        {title}
                    </h2>
                )}

                <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 md:gap-6 lg:gap-8 overflow-x-auto pt-4 pb-4 md:pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {selectedCategories.map((cat, index) => {
                        if (typeof cat !== 'object') return null
                        const category = cat as Category

                        const imageUrl = typeof category.image === 'object' ? category.image?.url : '/images/placeholder.png'
                        const label = category.title
                        const slug = category.slug

                        return (
                            <Link
                                key={index}
                                href={`/products?category=${slug}`}
                                className="flex flex-col items-center gap-3 md:gap-4 group min-w-[100px] md:min-w-[130px] lg:min-w-[150px] max-w-[180px] transition-transform hover:-translate-y-1 hover:cursor-pointer text-center"
                            >
                                <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#D4BC9B] transition-all shadow-sm">
                                    {imageUrl && (
                                        <Image
                                            src={imageUrl}
                                            alt={label}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    )}
                                </div>
                                <span className="text-xs md:text-sm font-bold text-gray-800 tracking-wide uppercase transition-colors group-hover:text-black">
                                    {label}
                                </span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
