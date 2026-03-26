'use client'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel'
import type { Media, Product } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { formatProductMessage, getWhatsAppLink } from '@/utilities/whatsapp'
import { MessageCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'

interface ProductSectionClientProps {
    title?: string | null
    subtitle?: string | null
    layout: 'grid' | 'carousel'
    products: Product[]
}

export const ProductSectionClient: React.FC<ProductSectionClientProps> = ({
    title,
    subtitle,
    layout,
    products
}) => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) return
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())
        api.on('select', () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api])

    const handleInquiry = (e: React.MouseEvent, product: any) => {
        e.preventDefault()
        e.stopPropagation()
        const message = formatProductMessage(product)
        const link = getWhatsAppLink(message)
        window.open(link, '_blank')
    }

    const renderProductCard = (product: Product, isCarousel = false) => {
        const image = typeof product.image === 'object' ? (product.image as Media) : null
        const price = typeof product.price === 'number' ? `₹${product.price.toLocaleString()}` : 'Price on Request'

        return (
            <Link
                href={`/products/${product.slug}`}
                className={cn(
                    "group flex flex-col gap-4",
                    isCarousel ? "items-center text-center px-2" : ""
                )}
            >
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-sm transition-all group-hover:shadow-md border border-gray-100">
                    {/* Subtle pattern background for carousel */}
                    {isCarousel && (
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                    )}

                    {image?.url && (
                        <Image
                            src={image.url}
                            alt={product.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    )}
                </div>

                <div className={cn("flex flex-col gap-1 w-full", isCarousel ? "items-center" : "")}>
                    <h3 className={cn(
                        "font-black text-gray-900 uppercase tracking-tight italic",
                        isCarousel ? "text-base md:text-lg" : "text-sm md:text-base leading-tight"
                    )}>
                        {product.title}
                    </h3>

                    <div className={cn("flex items-center mt-1 w-full", isCarousel ? "justify-center" : "justify-between")}>
                        <p className="text-sm md:text-base font-bold text-[#D4BC9B]">
                            {price}
                        </p>
                        {!isCarousel && (
                            <button
                                onClick={(e) => handleInquiry(e, product)}
                                className="p-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition-all duration-300 relative z-10"
                            >
                                <MessageCircle size={14} className="stroke-[2.5]" />
                            </button>
                        )}
                    </div>
                </div>
            </Link>
        )
    }

    return (
        <section className="bg-[#F9F7F2] py-16 md:py-24">
            <div className="container px-4">
                {(title || subtitle) && (
                    <div className="max-w-4xl mx-auto text-center mb-12 flex flex-col items-center gap-4">
                        {subtitle && (
                            <div className="inline-block px-4 py-1 bg-[#D4BC9B]/10 border border-[#D4BC9B]/20 rounded-full">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4BC9B]">
                                    {subtitle}
                                </span>
                            </div>
                        )}
                        {title && (
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter italic">
                                {title}
                            </h2>
                        )}
                        <div className="w-16 h-1 bg-[#D4BC9B] opacity-30 my-2" />
                    </div>
                )}

                {layout === 'grid' ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 max-w-7xl mx-auto">
                        {products.map((product) => (
                            <React.Fragment key={product.id}>
                                {renderProductCard(product)}
                            </React.Fragment>
                        ))}
                    </div>
                ) : (
                    <div className="relative max-w-6xl mx-auto group">
                        <Carousel setApi={setApi} opts={{ align: 'start', loop: true }} className="w-full">
                            <CarouselContent className="-ml-4 md:-ml-8">
                                {products.map((product) => (
                                    <CarouselItem key={product.id} className="pl-4 md:pl-8 basis-full sm:basis-1/2 md:basis-1/3">
                                        {renderProductCard(product, true)}
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            <div className="hidden lg:block">
                                <CarouselPrevious className="absolute -left-6 lg:-left-12 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm text-black border border-gray-100 shadow-lg hover:bg-black hover:text-white transition-all size-12 z-10 rounded-2xl" />
                                <CarouselNext className="absolute -right-6 lg:-right-12 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm text-black border border-gray-100 shadow-lg hover:bg-black hover:text-white transition-all size-12 z-10 rounded-2xl" />
                            </div>
                        </Carousel>

                        <div className="flex justify-center gap-3 mt-12">
                            {Array.from({ length: count }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => scrollTo(i)}
                                    className={cn(
                                        "h-1.5 rounded-full transition-all duration-500",
                                        current === i ? "w-10 bg-[#D4BC9B]" : "w-1.5 bg-gray-200 hover:bg-gray-300"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
