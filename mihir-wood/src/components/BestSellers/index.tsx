'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, MessageCircle } from 'lucide-react'
import { getWhatsAppLink, formatProductMessage } from '@/utilities/whatsapp'

const products = [
    {
        id: 1,
        title: 'Premium Photos',
        price: '₹49.90',
        priceInINR: 49.90,
        rating: 5,
        image: '/images/categories/teak-bed.png',
        slug: 'premium-photos-1',
    },
    {
        id: 2,
        title: 'Premium Carvings',
        price: '₹39.90',
        priceInINR: 39.90,
        image: '/images/categories/wardrobe.png',
        slug: 'premium-carvings',
    },
    {
        id: 3,
        title: 'Antique Chests',
        price: '₹49.90',
        priceInINR: 49.90,
        image: '/images/categories/smart-table.png',
        slug: 'antique-chests',
    },
    {
        id: 4,
        title: 'Premium Photos',
        price: '₹49.90',
        priceInINR: 49.90,
        image: '/images/categories/dining-table.png',
        slug: 'premium-photos-2',
    },
    {
        id: 5,
        title: 'Premium Board Linings',
        price: '₹29.80',
        priceInINR: 29.80,
        image: '/images/categories/sofa.png',
        slug: 'premium-board-linings',
    },
    {
        id: 6,
        title: 'Premium Photos',
        price: '₹39.90',
        priceInINR: 39.90,
        image: '/images/categories/teak-bed.png',
        slug: 'premium-photos-3',
    },
    {
        id: 7,
        title: 'Premium Photos',
        price: '₹49.50',
        priceInINR: 49.50,
        image: '/images/categories/wardrobe.png',
        slug: 'premium-photos-4',
    },
    {
        id: 8,
        title: 'Premium Photos',
        price: '₹49.90',
        priceInINR: 49.90,
        image: '/images/categories/dining-table.png',
        slug: 'premium-photos-5',
    },
]

export const BestSellers: React.FC = () => {
    const handleInquiry = (e: React.MouseEvent, product: any) => {
        e.preventDefault()
        e.stopPropagation()
        const message = formatProductMessage(product)
        const link = getWhatsAppLink(message)
        window.open(link, '_blank')
    }

    return (
        <section className="bg-[#F9F7F2] py-16">
            <div className="container px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            className="group flex flex-col gap-3"
                        >
                            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-sm transition-shadow group-hover:shadow-md">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <h3 className="text-sm md:text-base font-bold text-gray-900 leading-tight">
                                    {product.title}
                                </h3>

                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-sm md:text-base font-medium text-gray-700">
                                        {product.price}
                                    </p>
                                    <button
                                        onClick={(e) => handleInquiry(e, product)}
                                        className="p-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition-all duration-300 relative z-10"
                                    >
                                        <MessageCircle size={14} className="stroke-[2.5]" />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
