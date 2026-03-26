'use client'
import type { CustomFurnitureBlock, Media } from '@/payload-types'
import { formatBespokeMessage, getWhatsAppLink } from '@/utilities/whatsapp'
import { ChevronDown, Send } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

export const CustomFurniture: React.FC<CustomFurnitureBlock> = (props) => {
    const { title, mainImage, samples, formTitle, formSubtitle } = props
    const [category, setCategory] = useState('Start Designing Sofa')
    const [style, setStyle] = useState('Select Style')
    const [textures, setTextures] = useState('')

    const handleInquiry = () => {
        const message = formatBespokeMessage({ category, style, textures })
        const link = getWhatsAppLink(message)
        window.open(link, '_blank')
    }

    const mainImageUrl = typeof mainImage === 'object' ? (mainImage as Media)?.url : '/images/categories/sofa.png'
    const sampleImages = samples?.map(s => typeof s.image === 'object' ? (s.image as Media)?.url : '/images/placeholder.png') || []

    return (
        <section id="custom" className="bg-[#FEFDFB] py-16 md:py-24">
            <div className="container px-4">
                <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter italic">
                        {title}
                    </h2>
                    <div className="w-20 h-1 bg-[#D4BC9B] mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 max-w-7xl mx-auto items-stretch">
                    {/* Left: Craftsman Image */}
                    <div className="md:col-span-5 relative h-[400px] md:h-auto overflow-hidden rounded-3xl shadow-2xl">
                        {mainImageUrl && (
                            <Image
                                src={mainImageUrl}
                                alt="Craftsmanship"
                                fill
                                sizes="(max-width: 768px) 100vw, 40vw"
                                className="object-cover"
                            />
                        )}
                        <div className="absolute inset-0 bg-black/10 transition-colors hover:bg-transparent duration-500" />
                    </div>

                    {/* Middle: Material Samples */}
                    <div className="md:col-span-2 flex flex-col gap-4">
                        {sampleImages.map((src, i) => (
                            <div key={i} className="relative flex-1 min-h-[140px] overflow-hidden rounded-2xl shadow-lg group">
                                {src && (
                                    <Image
                                        src={src}
                                        alt={`Sample ${i + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 15vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right: Customization Form */}
                    <div className="md:col-span-5 bg-[#F5F2EA] p-8 md:p-12 rounded-[2.5rem] shadow-xl flex flex-col gap-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight uppercase tracking-tighter">
                                {formTitle}
                            </h3>
                            <p className="text-sm text-gray-600 font-bold uppercase tracking-widest italic">
                                {formSubtitle}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full appearance-none bg-white border border-gray-200 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-900 focus:ring-2 focus:ring-[#D4BC9B] transition-all cursor-pointer"
                                >
                                    <option>Start Designing Sofa</option>
                                    <option>Dining Sets</option>
                                    <option>Luxury Beds</option>
                                    <option>Statement Tables</option>
                                </select>
                                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4BC9B] pointer-events-none" />
                            </div>

                            <div className="relative">
                                <select
                                    value={style}
                                    onChange={(e) => setStyle(e.target.value)}
                                    className="w-full appearance-none bg-white border border-gray-200 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-900 focus:ring-2 focus:ring-[#D4BC9B] transition-all cursor-pointer"
                                >
                                    <option>Select Style</option>
                                    <option>Royal Classic</option>
                                    <option>Modern Minimalist</option>
                                    <option>Art Deco</option>
                                </select>
                                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4BC9B] pointer-events-none" />
                            </div>

                            <textarea
                                value={textures}
                                onChange={(e) => setTextures(e.target.value)}
                                placeholder="Describe your textures, dimensions, or specific requirements..."
                                rows={4}
                                className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-900 focus:ring-2 focus:ring-[#D4BC9B] transition-all resize-none placeholder:text-gray-400"
                            />

                            <button
                                onClick={handleInquiry}
                                className="w-full group bg-black hover:bg-[#D4BC9B] text-white hover:text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl active:scale-95"
                            >
                                Request Bespoke Design
                                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
