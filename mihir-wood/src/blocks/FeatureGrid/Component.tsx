import type { Media } from '@/payload-types'
import { Award, Check, Globe, ShieldCheck, Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const iconMap = {
    shield: ShieldCheck,
    award: Award,
    star: Star,
    check: Check,
    globe: Globe,
}

export const FeatureGrid: React.FC<any> = (props) => {
    const { title, subtitle, features, image } = props
    const img = typeof image === 'object' ? (image as Media) : null

    const titleParts = (title || '').split(' ')
    const firstPart = titleParts.slice(0, -1).join(' ')
    const lastPart = titleParts.slice(-1).join(' ')

    return (
        <section className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="container px-4">
                {(title || subtitle) && (
                    <div className="max-w-4xl mb-16 space-y-4">
                        {title && (
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter italic leading-none">
                                {firstPart} {firstPart && <br />}
                                <span className="text-[#D4BC9B]">{lastPart}</span>
                            </h2>
                        )}
                        <div className="w-1/3 h-px bg-gray-200" />
                        {subtitle && (
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs italic">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    <div className="md:col-span-1 flex flex-col gap-8">
                        {features?.map((feature: any, i: number) => {
                            const Icon = iconMap[feature.icon as keyof typeof iconMap] || ShieldCheck
                            return (
                                <div key={i} className="bg-[#F5F2EA] p-10 rounded-[3rem] space-y-6 flex-1 hover:shadow-lg transition-all duration-500 border border-[#FAF9F6]">
                                    <Icon className="w-12 h-12 text-[#D4BC9B]" />
                                    <h3 className="text-2xl font-black text-black uppercase tracking-tighter italic">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed font-medium">
                                        {feature.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>

                    {img && (
                        <div className="md:col-span-2 relative h-[400px] md:auto rounded-[3rem] overflow-hidden shadow-2xl group min-h-[500px]">
                            <Image
                                src={img.url!}
                                alt={img.alt || 'Feature Image'}
                                fill
                                className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-12 left-12 right-12 text-white space-y-4">
                                <span className="text-[#D4BC9B] font-black uppercase tracking-widest text-[10px]">The Archive</span>
                                <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">Silent Symphony of Tools</h4>
                                <p className="max-w-xl text-gray-300 font-light italic">
                                    Where human hands converse with nature to create objects of profound beauty.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
