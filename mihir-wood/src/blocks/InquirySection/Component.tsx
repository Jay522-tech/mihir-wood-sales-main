'use client'
import type { Media } from '@/payload-types'
import { Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export const InquirySection: React.FC<any> = (props) => {
    const { title, description, image, variant = 'default' } = props

    const imageUrl = typeof image === 'object' ? (image as Media)?.url : '/images/categories/sofa.png'

    if (variant === 'simple') {
        return (
            <section className="bg-white py-16 md:py-24 overflow-hidden">
                <div className="container px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Left: Image or Map */}
                            <div className="relative aspect-[4/3] lg:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border border-neutral-100">
                                {props.mapUrl ? (
                                    <iframe
                                        src={props.mapUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                ) : (
                                    <>
                                        {imageUrl && (
                                            <Image
                                                src={imageUrl}
                                                alt="Request Quote"
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-black/5" />
                                    </>
                                )}
                            </div>

                            {/* Right: Content & Form */}
                            <div className="space-y-10">
                                <div className="space-y-6">
                                    <h2 className="text-4xl md:text-6xl font-serif text-gray-900 leading-tight italic">
                                        {title}
                                    </h2>
                                    {description && (
                                        <p className="text-lg text-gray-500 font-light italic max-w-lg">
                                            {description}
                                        </p>
                                    )}
                                    <div className="w-16 h-px bg-[#D4BC9B] opacity-40" />
                                </div>

                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            className="w-full bg-[#F9F7F2] border-none rounded-xl px-6 py-4 text-sm font-bold text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#D4BC9B] transition-all"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="w-full bg-[#F9F7F2] border-none rounded-xl px-6 py-4 text-sm font-bold text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#D4BC9B] transition-all"
                                        />
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        className="w-full bg-[#F9F7F2] border-none rounded-xl px-6 py-4 text-sm font-bold text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#D4BC9B] transition-all"
                                    />
                                    <textarea
                                        placeholder="Tell us about your project..."
                                        rows={4}
                                        className="w-full bg-[#F9F7F2] border-none rounded-xl px-6 py-4 text-sm font-bold text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#D4BC9B] transition-all resize-none"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-black text-white font-black py-5 rounded-xl uppercase tracking-[0.2em] shadow-lg hover:bg-[#D4BC9B] transition-all active:scale-[0.98] mt-2 group flex items-center justify-center gap-3"
                                    >
                                        SUBMIT REQUEST
                                        <span className="w-8 h-px bg-white/30 group-hover:w-12 transition-all duration-500" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="bg-[#FAF9F6] py-16 md:py-24">
            <div className="container px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* Left: Testimonial with Image Overlay */}
                    <div className="relative group">
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                            {imageUrl && (
                                <Image
                                    src={imageUrl}
                                    alt="Room Background"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/10" />
                        </div>

                        {/* Floating Testimonial Card */}
                        {props.testimonial?.name && (
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-left-12 bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-[calc(100%-2rem)] max-w-[300px] md:max-w-[380px] border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 border-[#D4BC9B] relative">
                                        {(props.testimonial.image as Media)?.url ? (
                                            <Image
                                                src={(props.testimonial.image as Media).url!}
                                                alt={props.testimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-[10px] text-neutral-400 font-bold uppercase">
                                                {props.testimonial.name.slice(0, 2)}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{props.testimonial.name}</h4>
                                        <p className="text-xs text-gray-500 font-medium">{props.testimonial.role || 'Verified Customer'}</p>
                                    </div>
                                </div>
                                <p className="text-gray-800 font-bold text-sm md:text-base leading-relaxed mb-4 italic">
                                    {props.testimonial.text}
                                </p>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-[#D4BC9B] text-[#D4BC9B]" />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Inquiry Form */}
                    <div className="bg-[#E8E4D9]/30 p-8 md:p-12 lg:p-16 rounded-[2.5rem] shadow-sm border border-white/40">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
                            {title}
                        </h2>
                        {description && (
                            <p className="text-gray-600 mb-8 font-medium">
                                {description}
                            </p>
                        )}

                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full bg-white border border-gray-200 rounded-xl px-6 py-4 text-base font-bold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#D4BC9B] transition-all"
                                />
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    className="w-full bg-white border border-gray-200 rounded-xl px-6 py-4 text-base font-bold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#D4BC9B] transition-all"
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Requirement"
                                    rows={4}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-6 py-4 text-base font-bold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#D4BC9B] transition-all resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-black text-white font-black py-5 rounded-xl uppercase tracking-[0.2em] shadow-lg hover:bg-gray-900 transition-all active:scale-[0.98] mt-4"
                            >
                                SEND INQUIRY
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
