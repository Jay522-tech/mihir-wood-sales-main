'use client'
import { CMSLink } from '@/components/Link'
import type { Media } from '@/payload-types'
import { Package, ArrowRight } from 'lucide-react'
import React from 'react'
import Image from 'next/image'

export const BulkOrderBanner: React.FC<any> = (props) => {
    const { title, highlightText, description, image, links } = props

    const img = typeof image === 'object' ? (image as Media) : null

    // Fallback logic for title splitting if not explicitly provided in CMS
    let mainTitle = title
    let subTitle = highlightText

    if (!subTitle && title?.toUpperCase().includes('AT SCALE')) {
        mainTitle = title.toUpperCase().replace('AT SCALE', '').trim()
        subTitle = 'AT SCALE'
    }

    return (
        <section className="relative w-full py-16 md:py-28 overflow-hidden bg-neutral-950 group">
            {/* Background Image with Zoom Effect */}
            {img?.url && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={img.url}
                        alt={img.alt || title}
                        fill
                        className="object-cover transition-transform duration-[10s] group-hover:scale-110 opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60 shadow-inner" />
                </div>
            )}

            <div className="container relative z-10 px-4">
                <div className="max-w-5xl mx-auto text-center space-y-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#4A3F35]/80 border border-white/10 rounded-lg text-white/90 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-sm mx-auto shadow-xl">
                        <Package className="w-3.5 h-3.5" />
                        <span>Corporate & Bulk Solutions</span>
                    </div>

                    {/* Titles */}
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[0.85] uppercase tracking-tighter italic filter drop-shadow-lg">
                            {mainTitle}
                            {subTitle && (
                                <span className="block text-[#D4BC9B] mt-2">{subTitle}</span>
                            )}
                        </h2>
                    </div>

                    {/* Description */}
                    {description && (
                        <p className="text-white/80 text-sm md:text-lg max-w-3xl mx-auto leading-relaxed font-medium">
                            {description}
                        </p>
                    )}

                    {/* Buttons */}
                    {Array.isArray(links) && links.length > 0 && (
                        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-10">
                            {links.map(({ link }, i) => (
                                <CMSLink
                                    key={i}
                                    {...link}
                                    className={i === 0
                                        ? 'bg-[#D4BC9B] hover:bg-white text-black px-10 py-5 rounded-full font-black uppercase tracking-[0.15em] text-[11px] md:text-xs transition-all duration-300 flex items-center shadow-2xl hover:-translate-y-1'
                                        : 'text-white hover:text-[#D4BC9B] font-black uppercase tracking-[0.2em] text-[11px] md:text-xs transition-all duration-300'
                                    }
                                >
                                    {i === 0 && <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>}
                                </CMSLink>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
