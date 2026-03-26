import { CMSLink } from '@/components/Link'
import { RichText } from '@/components/RichText'
import type { Media } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export const AsymmetricalContent: React.FC<any> = (props) => {
    const { layout, title, badge, description, mainImage, secondaryImage, enableLink, link } = props

    const mainImg = typeof mainImage === 'object' ? (mainImage as Media) : null
    const secImg = typeof secondaryImage === 'object' ? (secondaryImage as Media) : null

    const titleParts = (title || '').split(' ')
    const firstPart = titleParts.slice(0, -1).join(' ')
    const lastPart = titleParts.slice(-1).join(' ')

    return (
        <section className="py-16 md:py-24 bg-[#FAF9F6] relative overflow-hidden">
            <div className="container px-4">
                <div className={cn(
                    "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center",
                    layout === 'imageRight' ? "lg:flex-row-reverse" : ""
                )}>
                    {/* Image Column */}
                    <div className={cn(
                        "lg:col-span-7 relative",
                        layout === 'imageRight' ? "lg:order-last" : ""
                    )}>
                        <div className={cn(
                            "relative aspect-video overflow-hidden shadow-2xl z-20",
                            layout === 'imageLeft' ? "rounded-tl-[5rem] rounded-br-[5rem]" : "rounded-tr-[5rem] rounded-bl-[5rem]"
                        )}>
                            {mainImg?.url && (
                                <Image
                                    src={mainImg.url}
                                    alt={mainImg.alt || title}
                                    fill
                                    className="object-cover transition-transform duration-1000 hover:scale-105"
                                />
                            )}
                        </div>

                        {/* Secondary Overlapping Image */}
                        {secImg?.url && (
                            <div className={cn(
                                "absolute w-1/2 aspect-square rounded-full border-8 border-[#FAF9F6] overflow-hidden shadow-2xl z-30 hidden lg:block",
                                layout === 'imageLeft' ? "-bottom-16 -right-16" : "-bottom-16 -left-16"
                            )}>
                                <Image
                                    src={secImg.url}
                                    alt={secImg.alt || 'Detail'}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* Text Column */}
                    <div className="lg:col-span-5 space-y-8 relative z-10">
                        <div className="space-y-4">
                            {badge && (
                                <p className="text-[#D4BC9B] font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs italic">
                                    {badge}
                                </p>
                            )}
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter italic leading-none">
                                {firstPart} {firstPart && <br />}
                                <span className="text-[#D4BC9B]">{lastPart}</span>
                            </h2>
                        </div>

                        {description && (
                            <div className="text-gray-600 font-medium leading-relaxed italic border-l-4 border-[#D4BC9B] pl-8">
                                <RichText data={description} enableGutter={false} />
                            </div>
                        )}

                        {enableLink && link && (
                            <div className="pt-4">
                                <CMSLink
                                    {...link}
                                    className="group flex items-center gap-4 text-gray-900 font-black uppercase tracking-widest text-sm hover:text-[#D4BC9B] transition-colors"
                                >
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                </CMSLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
