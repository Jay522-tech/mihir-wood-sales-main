import type { Media } from '@/payload-types'
import { cn } from '@/utilities/cn'
import Image from 'next/image'
import React from 'react'

export const ProjectShowcase: React.FC<any> = (props) => {
    const { title, subtitle, layout, projects } = props

    const titleParts = (title || '').split(' ')
    const firstPart = titleParts.slice(0, -1).join(' ')
    const lastPart = titleParts.slice(-1).join(' ')

    return (
        <section className="py-16 md:py-24 bg-[#FEFDFB]">
            <div className="container px-4">
                {(title || subtitle) && (
                    <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
                        {title && (
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter italic">
                                {firstPart} <span className="text-[#D4BC9B]">{lastPart}</span>
                            </h2>
                        )}
                        <div className="w-20 h-1 bg-[#D4BC9B] mx-auto" />
                        {subtitle && (
                            <p className="text-gray-500 uppercase tracking-[0.4em] font-bold text-[10px] md:text-xs">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                <div className={cn(
                    "max-w-7xl mx-auto",
                    layout === 'slider'
                        ? "flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar"
                        : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
                )}>
                    {projects?.map((proj: any, i: number) => {
                        const img = typeof proj.image === 'object' ? (proj.image as Media) : null
                        return (
                            <div
                                key={i}
                                className={cn(
                                    "group cursor-pointer",
                                    layout === 'slider' ? "min-w-[85vw] sm:min-w-[45vw] lg:min-w-[30vw] snap-center" : ""
                                )}
                            >
                                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-700">
                                    {img?.url && (
                                        <Image
                                            src={img.url}
                                            alt={proj.title || 'Project'}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />

                                    {/* Project Overlay (Slider version) */}
                                    {layout === 'slider' && (
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <h3 className="text-xl font-bold text-white mb-2">{proj.title}</h3>
                                                <div className="w-12 h-1 bg-[#D4BC9B]" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Info (Grid version) */}
                                {layout === 'grid' && (
                                    <div className="space-y-2 px-6">
                                        <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic group-hover:text-[#D4BC9B] transition-colors">
                                            {proj.title}
                                        </h4>
                                        <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-[0.2em] italic opacity-80">
                                            {proj.location}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
