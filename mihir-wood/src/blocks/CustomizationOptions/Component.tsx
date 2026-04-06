import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

export const CustomizationOptionsComponent: React.FC<any> = ({ title, subtitle, options }) => {
    return (
        <section className="py-24 bg-white">
            <div className="container px-4">
                <div className="text-center mb-16 space-y-2">
                    <h2 className="text-3xl text-[#D4BC9B] font-medium uppercase tracking-wider">{title}</h2>
                    <p className="text-gray-600 font-medium">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.isArray(options) && options.map((option, index) => {
                        const img = typeof option.image === 'object' ? (option.image as Media) : null

                        return (
                            <div key={index} className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden group">
                                {img?.url && (
                                    <Image
                                        src={img.url}
                                        alt={img.alt || option.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                    />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                                    <h3 className="text-2xl font-medium mb-2">{option.title}</h3>
                                    <p className="text-sm text-gray-200">
                                        {option.description}
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
