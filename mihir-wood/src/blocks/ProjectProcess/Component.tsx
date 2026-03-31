import type { Media } from '@/payload-types'
import { cn } from '@/utilities/cn'
import Image from 'next/image'
import React from 'react'

export const ProjectProcess: React.FC<any> = (props) => {
    const { title, subtitle, steps, variant = 'default' } = props

    if (variant === 'grid') {
        return (
            <section className="py-24 md:py-32 bg-white overflow-hidden">
                <div className="container px-4">
                    <div className="text-center mb-20 md:mb-28 space-y-4">
                        <h2 className="text-3xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter italic leading-none">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="text-[#D4BC9B] font-black uppercase tracking-[0.3em] text-xs md:text-sm">
                                {subtitle}
                            </p>
                        )}
                        <div className="w-24 h-1 bg-[#D4BC9B] mx-auto mt-8" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {Array.isArray(steps) && steps.map((step, index) => {
                            const { title: stepTitle, description, image } = step
                            const img = typeof image === 'object' ? (image as Media) : null
                            return (
                                <div key={index} className="space-y-8 group">
                                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl border-[6px] border-white group-hover:shadow-2xl transition-all duration-700">
                                        {img?.url && (
                                            <Image
                                                src={img.url}
                                                alt={img.alt || stepTitle}
                                                fill
                                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                        )}
                                        <div className="absolute top-6 left-6 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-sm font-black text-[#D4BC9B]">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <div className="space-y-4 px-2">
                                        <div className="flex items-center gap-4">
                                            <span className="text-3xl font-black text-[#D4BC9B]/30 italic">{index + 1}</span>
                                            <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight italic">
                                                {stepTitle}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium italic">
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-20 md:py-32 bg-white overflow-hidden">
            <div className="container px-4">
                {/* Header */}
                <div className="max-w-3xl mb-20 md:mb-32">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter italic leading-tight">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-4 text-[#D4BC9B] font-black uppercase tracking-[0.3em] text-xs md:text-sm">
                            {subtitle}
                        </p>
                    )}
                    <div className="w-20 h-1.5 bg-[#D4BC9B] mt-8" />
                </div>

                {/* Steps */}
                <div className="space-y-32 md:space-y-48">
                    {Array.isArray(steps) && steps.map((step, index) => {
                        const { title: stepTitle, description, image } = step
                        const isEven = index % 2 === 1
                        const stepNumber = (index + 1).toString().padStart(2, '0')
                        const img = typeof image === 'object' ? (image as Media) : null

                        return (
                            <div
                                key={index}
                                className={cn(
                                    "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center",
                                    isEven ? "lg:flex-row-reverse" : ""
                                )}
                            >
                                {/* Text Content */}
                                <div className={cn(
                                    "lg:col-span-5 relative space-y-6",
                                    isEven ? "lg:order-last lg:pl-12" : "lg:pr-12"
                                )}>
                                    {/* Large Background Number */}
                                    <span className="absolute -top-20 -left-4 lg:-left-8 text-[120px] md:text-[200px] font-black text-neutral-100 select-none z-0 leading-none">
                                        {stepNumber}
                                    </span>

                                    <div className="relative z-10 space-y-4">
                                        <h3 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter italic">
                                            {stepTitle}
                                        </h3>
                                        <p className="text-gray-500 text-lg md:text-xl leading-relaxed italic font-medium">
                                            {description}
                                        </p>
                                    </div>
                                </div>

                                {/* Image Content */}
                                <div className={cn(
                                    "lg:col-span-7",
                                    isEven ? "" : ""
                                )}>
                                    <div className="relative aspect-[4/3] md:aspect-video rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl group">
                                        {img?.url && (
                                            <Image
                                                src={img.url}
                                                alt={img.alt || stepTitle}
                                                fill
                                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
