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
import type { Product, Media } from '@/payload-types'
import { Price } from '@/components/Price'

export const NewArrivals: React.FC<{ products?: Product[] }> = ({ products }) => {
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
                <h2 className="text-center text-sm md:text-2xl font-bold text-gray-900 mb-12 uppercase tracking-[0.2em]">
                    NEW ARRIVALS - SEASON 2026
                </h2>

                <div className="relative max-w-5xl mx-auto">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            align: 'start',
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4 md:-ml-8">
                            {(products || []).map((product) => {
                                const image = (product.meta?.image || product.gallery?.[0]?.image || (product as any).image) as Media
                                const priceVal = product.priceInINR || (product as any).price

                                return (
                                    <CarouselItem key={product.id} className="pl-4 md:pl-8 basis-full sm:basis-1/2 md:basis-1/3">
                                        <Link href={`/products/${product.slug}`} className="flex flex-col items-center gap-5 group">
                                            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 transition-all group-hover:shadow-md">
                                                {/* Subtle pattern background as seen in design */}
                                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                                    style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

                                                <Image
                                                    src={image?.url || '/images/placeholder.png'}
                                                    alt={product.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>

                                            <div className="text-center space-y-1">
                                                <h3 className="text-base md:text-lg font-bold text-gray-900 uppercase tracking-wide">
                                                    {product.title}
                                                </h3>
                                                <div className="text-sm md:text-base font-medium text-gray-600">
                                                    {typeof priceVal === 'number' ? <Price amount={priceVal} className="m-0 p-0" /> : 'Price on Request'}
                                                </div>
                                            </div>
                                        </Link>
                                    </CarouselItem>
                                )
                            })}
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
