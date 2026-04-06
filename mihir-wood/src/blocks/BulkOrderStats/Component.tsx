import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { Users, Truck, ShieldCheck, PenTool, Factory, Ruler } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { InquiryModal } from '@/components/InquiryModal'

const iconMap: Record<string, React.ElementType> = {
    'users': Users,
    'truck': Truck,
    'shield': ShieldCheck,
    'pen-tool': PenTool,
    'factory': Factory,
    'ruler': Ruler,
}

export const BulkOrderStatsComponent: React.FC<any> = ({ mainTitle, mainSubtitle, title, subtitle, stats, image, links }) => {
    const img = typeof image === 'object' ? (image as Media) : null

    return (
        <section className="py-24 bg-white">
            <div className="container px-4">
                {/* Top Centered Header */}
                {(mainTitle || mainSubtitle) && (
                    <div className="text-center mb-20 space-y-4">
                        {mainTitle && (
                            <h2 className="text-3xl md:text-5xl font-medium text-gray-900 tracking-tight">
                                {mainTitle}
                            </h2>
                        )}
                        {mainSubtitle && (
                            <p className="text-gray-600 text-lg">
                                {mainSubtitle}
                            </p>
                        )}
                        <div className="w-24 h-1 bg-[#D4BC9B] mx-auto mt-6" />
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left side content */}
                    <div className="space-y-12">
                        <div className="space-y-2">
                            <h2 className="text-3xl md:text-5xl text-gray-900 font-medium">
                                {title}
                            </h2>
                            <p className="text-gray-600 text-lg">
                                {subtitle}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {Array.isArray(stats) && stats.map((stat, i) => {
                                const Icon = iconMap[stat.icon] || Users
                                return (
                                    <div key={i} className="flex gap-4 items-center">
                                        <div className="w-14 h-14 rounded-full border border-[#D4BC9B] flex items-center justify-center shrink-0">
                                            <Icon className="w-6 h-6 text-[#D4BC9B]" />
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                                            <div className="text-sm text-gray-500">{stat.label}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {Array.isArray(links) && links.length > 0 && links[0].link && (
                            <div className="mt-12">
                                <InquiryModal>
                                    <button className="inline-flex items-center justify-center rounded-3xl bg-black px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 w-fit">
                                        {links[0].link.label || 'Get Started'}
                                    </button>
                                </InquiryModal>
                            </div>
                        )}
                    </div>

                    {/* Right side image */}
                    {img?.url && (
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm group">
                            <Image
                                src={img.url}
                                alt={img.alt || title}
                                fill
                                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                            />
                            {/* Subtly fading circular backdrop behind image as shown in design */}
                            <div className="absolute inset-0 -z-10 bg-gray-50 rounded-full scale-125 translate-x-12" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
