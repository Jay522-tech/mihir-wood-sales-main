import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const categories = [
    { label: 'Sofa', image: '/images/categories/sofa.png', slug: 'sofa' },
    { label: 'Teak Bed', image: '/images/categories/teak-bed.png', slug: 'teak-bed' },
    { label: 'Dining Table', image: '/images/categories/dining-table.png', slug: 'dining-table' },
    { label: 'Smart Table', image: '/images/categories/smart-table.png', slug: 'smart-table' },
    { label: 'Wardrobe', image: '/images/categories/wardrobe.png', slug: 'wardrobe' },
    { label: 'Work Desk', image: '/images/categories/sofa.png', slug: 'work-desk' }, // Placeholder for now
]

export const CategoryCircles: React.FC = () => {
    return (
        <section className="bg-[#F9F7F2] py-12 md:py-16">
            <div className="container px-4">
                <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-10 md:mb-14 tracking-tight">
                    Product Categories
                </h2>

                <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-6 md:gap-10 overflow-x-auto pt-4 pb-4 md:pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {categories.map((category) => (
                        <Link
                            key={category.label}
                            href={`/products?category=${category.slug}`}
                            className="flex flex-col items-center gap-4 group min-w-[110px] md:min-w-[160px] transition-transform hover:-translate-y-1 hover:cursor-pointer"
                        >
                            <div className="relative w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#D4BC9B] transition-all shadow-sm">
                                <Image
                                    src={category.image}
                                    alt={category.label}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <span className="text-xs md:text-sm font-bold text-gray-800 tracking-wide uppercase transition-colors group-hover:text-black">
                                {category.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
