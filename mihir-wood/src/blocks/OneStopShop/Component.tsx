import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { InquiryModal } from '@/components/InquiryModal'

export const OneStopShopComponent: React.FC<any> = ({ title, subtitle, categories, links }) => {

    return (
        <section className="py-24 bg-[#f6f7fa]">
            <div className="container px-4">
                <div className="text-center mb-16 space-y-2">
                    <h2 className="text-3xl text-gray-900 font-medium">{title}</h2>
                    <p className="text-gray-600 text-sm">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {Array.isArray(categories) && categories.map((cat, i) => {
                        const img = typeof cat.image === 'object' ? (cat.image as Media) : null
                        return (
                            <div key={i} className="flex flex-col space-y-6">
                                {img?.url && (
                                    <div className="relative aspect-square md:aspect-[4/5] lg:aspect-square w-full rounded-2xl overflow-hidden shadow-sm group">
                                        <Image
                                            src={img.url}
                                            alt={img.alt || cat.title}
                                            fill
                                            className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:grayscale"
                                        />
                                    </div>
                                )}
                                <div className="space-y-4 px-2">
                                    <h3 className="text-lg font-medium text-gray-900">{cat.title}</h3>
                                    <ul className="space-y-2">
                                        {Array.isArray(cat.items) && cat.items.map((itemObj: any, j: number) => (
                                            <li key={j} className="text-sm text-gray-600 flex items-start gap-2">
                                                <span className="text-black font-bold pt-1">•</span>
                                                {itemObj.item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {Array.isArray(links) && links.length > 0 && links[0].link && (
                    <div className="mt-20 text-center flex justify-center">
                        <InquiryModal>
                            <button className="inline-flex items-center justify-center rounded-3xl bg-[#D4BC9B] px-10 py-4 text-sm font-medium text-white transition-colors hover:bg-[#C6AC89]">
                                {links[0].link.label || 'Book A FREE Consultation'}
                            </button>
                        </InquiryModal>
                    </div>
                )}
            </div>
        </section>
    )
}
