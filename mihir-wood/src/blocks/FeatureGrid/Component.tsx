import type { Media } from '@/payload-types'
import { Award, Check, Globe, ShieldCheck, Star, Bed, Briefcase, Utensils, Home, PenTool, DollarSign, Hammer, Clock } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const iconMap = {
    shield: ShieldCheck,
    award: Award,
    star: Star,
    check: Check,
    globe: Globe,
    bed: Bed,
    briefcase: Briefcase,
    utensils: Utensils,
    home: Home,
    pentool: PenTool,
    dollar: DollarSign,
    hammer: Hammer,
    clock: Clock,
}

export const FeatureGrid: React.FC<any> = (props) => {
    const { title, subtitle, features, image, variant = 'default', isDark = false } = props
    const img = typeof image === 'object' ? (image as Media) : null

    const titleParts = (title || '').split(' ')
    const firstPart = titleParts.slice(0, -1).join(' ')
    const lastPart = titleParts.slice(-1).join(' ')

    if (variant === 'cards') {
        return (
            <section className="py-16 md:py-24 bg-[#F9F7F2]">
                <div className="container px-4">
                    {(title || subtitle) && (
                        <div className="text-center mb-16 space-y-4">
                            {title && (
                                <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter italic">
                                    {title}
                                </h2>
                            )}
                            {subtitle && (
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs italic">
                                    {subtitle}
                                </p>
                            )}
                            <div className="w-20 h-1 bg-[#D4BC9B] mx-auto opacity-50" />
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features?.map((feature: any, i: number) => {
                            const Icon = iconMap[feature.icon as keyof typeof iconMap] || ShieldCheck
                            return (
                                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 text-center space-y-6 flex flex-col items-center border border-gray-50 group">
                                    <div className="w-16 h-16 bg-[#F9F7F2] rounded-xl flex items-center justify-center text-[#D4BC9B] group-hover:bg-[#D4BC9B] group-hover:text-white transition-colors duration-500">
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-black text-black uppercase tracking-tight italic">{feature.title}</h3>
                                        <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                            {feature.description}
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

    if (variant === 'whyChooseUs') {
        return (
            <section className="relative py-24 md:py-32 overflow-hidden">
                {img && (
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={img.url!}
                            alt={img.alt || 'Background'}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                    </div>
                )}
                <div className="container px-4 relative z-10 text-center">
                    {(title || subtitle) && (
                        <div className="mb-16 space-y-4">
                            {title && (
                                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic">
                                    {firstPart} <span className="text-[#D4BC9B]">{lastPart}</span>
                                </h2>
                            )}
                            {subtitle && (
                                <p className="text-gray-300 font-bold uppercase tracking-widest text-xs italic">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features?.map((feature: any, i: number) => {
                            const Icon = iconMap[feature.icon as keyof typeof iconMap] || ShieldCheck
                            return (
                                <div key={i} className="bg-white p-8 rounded-2xl shadow-2xl space-y-6 flex flex-col items-center group hover:-translate-y-2 transition-transform duration-500">
                                    <div className="w-16 h-16 border-2 border-[#D4BC9B] rounded-xl flex items-center justify-center text-[#D4BC9B] group-hover:bg-[#D4BC9B] group-hover:text-white transition-all duration-500">
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-black text-black uppercase tracking-tight italic">{feature.title}</h3>
                                        <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                            {feature.description}
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
        <section className={`py-16 md:py-24 overflow-hidden ${isDark ? 'bg-black text-white' : 'bg-white'}`}>
            <div className="container px-4">
                {(title || subtitle) && (
                    <div className="max-w-4xl mb-16 space-y-4">
                        {title && (
                            <h2 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {firstPart} {firstPart && <br />}
                                <span className="text-[#D4BC9B]">{lastPart}</span>
                            </h2>
                        )}
                        <div className={`w-1/3 h-px ${isDark ? 'bg-white/20' : 'bg-gray-200'}`} />
                        {subtitle && (
                            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} font-bold uppercase tracking-widest text-xs italic`}>
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
                                <div key={i} className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-[#F5F2EA] border-[#FAF9F6]'} p-10 rounded-[3rem] space-y-6 flex-1 hover:shadow-lg transition-all duration-500 border`}>
                                    <Icon className="w-12 h-12 text-[#D4BC9B]" />
                                    <h3 className={`text-2xl font-black uppercase tracking-tighter italic ${isDark ? 'text-white' : 'text-black'}`}>{feature.title}</h3>
                                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed font-medium`}>
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
