'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/utilities/cn'

const arrivals = [
    { id: 1, title: 'Sofa', price: '₹19,000', image: '/images/categories/sofa.png', slug: 'sofa' },
    { id: 2, title: 'Dining Table', price: '₹19,000', image: '/images/categories/dining-table.png', slug: 'dining-table' },
    { id: 3, title: 'Chair', price: '₹19,000', image: '/images/categories/teak-bed.png', slug: 'chair' },
    { id: 4, title: 'Premium Bench', price: '₹29,000', image: '/images/categories/sofa.png', slug: 'bench' },
    { id: 5, title: 'Smart Table', price: '₹19,000', image: '/images/categories/smart-table.png', slug: 'smart-table-arrival' },
    { id: 6, title: 'Handcrafted Wardrobe', price: '₹49,000', image: '/images/categories/wardrobe.png', slug: 'wardrobe-arrival' },
]

export const NewArrivals: React.FC = () => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api])

    return (
        <section className="bg-[#F9F7F2] py-16 md:py-24">
            <div className="container px-4">
                <h2 className="text-center text-xl md:text-2xl font-bold text-gray-900 mb-12 uppercase tracking-[0.2em]">
                    NEW ARRIVALS - SEASON 2026
                </h2>

                <div className="relative max-w-5xl mx-auto group">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            align: 'start',
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4 md:-ml-8">
                            {arrivals.map((item) => (
                                <CarouselItem key={item.id} className="pl-4 md:pl-8 basis-full sm:basis-1/2 md:basis-1/3">
                                    <Link href={`/products/${item.slug}`} className="flex flex-col items-center gap-5 group/card">
                                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 transition-all group-hover/card:shadow-md">
                                            {/* Subtle pattern background as seen in design */}
                                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                                            />
                                        </div>

                                        <div className="text-center space-y-1">
                                            <h3 className="text-base md:text-lg font-bold text-gray-900 uppercase tracking-wide">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm md:text-base font-medium text-gray-600">
                                                {item.price}
                                            </p>
                                        </div>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Custom Navigation arrows - Always visible on desktop */}
                        <div className="hidden lg:block">
                            <CarouselPrevious className="absolute -left-6 lg:-left-12 top-1/2 -translate-y-1/2 bg-white text-black border border-gray-200 shadow-md hover:bg-gray-50 transition-all size-10 z-10" />
                            <CarouselNext className="absolute -right-6 lg:-right-12 top-1/2 -translate-y-1/2 bg-white text-black border border-gray-200 shadow-lg hover:bg-gray-50 transition-all size-10 z-10" />
                        </div>
                    </Carousel>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-10">
                        {Array.from({ length: count }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => scrollTo(i)}
                                className={cn(
                                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                                    current === i
                                        ? "w-8 bg-black"
                                        : "bg-gray-300 hover:bg-gray-400"
                                )}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
