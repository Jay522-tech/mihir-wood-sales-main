'use client'
import { CMSLink } from '@/components/Link'
import type { Media } from '@/payload-types'
import { Package } from 'lucide-react'
import React from 'react'

export const BulkOrderBanner: React.FC<any> = (props) => {
    const { title, image, links } = props

    const imageUrl = typeof image === 'object' ? (image as Media)?.url : 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1974&auto=format&fit=crop'

    return (
        <section className="relative w-full py-16 md:py-20 overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url("${imageUrl}")`,
                }}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            </div>

            <div className="container relative z-10 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4BC9B]/20 border border-[#D4BC9B]/30 rounded-full text-[#D4BC9B] text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                        <Package className="w-4 h-4" />
                        <span>Corporate & Bulk Solutions</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter italic">
                        {title}
                    </h2>

                    {Array.isArray(links) && links.length > 0 && (
                        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-6">
                            {links.map(({ link }, i) => (
                                <CMSLink
                                    key={i}
                                    {...link}
                                    className={`${i === 0
                                        ? 'bg-[#D4BC9B] hover:bg-white text-black px-10 py-4 rounded-full font-black'
                                        : 'text-white hover:text-[#D4BC9B] font-bold border-b border-white/20 hover:border-[#D4BC9B] pb-1'
                                        } uppercase tracking-widest text-sm transition-all duration-300 flex items-center gap-3 shadow-2xl active:scale-95`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
