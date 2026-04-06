'use client'
import type { CustomFurnitureBlock, Media } from '@/payload-types'
import { formatBespokeMessage, getWhatsAppLink } from '@/utilities/whatsapp'
import { Send } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useWhatsApp } from '@/providers/WhatsApp'

export const CustomFurnitureClient: React.FC<CustomFurnitureBlock & { dynamicCategories?: string[] }> = (props) => {
    const { phoneNumber } = useWhatsApp()
    const { title, mainImage, samples, formTitle, formSubtitle, styles, dynamicCategories } = props

    const categoryOptions = dynamicCategories?.length ? dynamicCategories : ['Start Designing Sofa', 'Dining Sets', 'Luxury Beds', 'Statement Tables']
    const styleOptions = styles?.length ? styles.map(s => s.label) : ['Select Style', 'Royal Classic', 'Modern Minimalist', 'Art Deco']

    const [category, setCategory] = useState(categoryOptions[0])
    const [style, setStyle] = useState(styleOptions[0])
    const [textures, setTextures] = useState('')

    const handleInquiry = () => {
        const message = formatBespokeMessage({ category, style, textures })
        const link = getWhatsAppLink(message, phoneNumber)
        window.open(link, '_blank')
    }

    const mainImageUrl = typeof mainImage === 'object' ? (mainImage as Media)?.url : '/images/categories/sofa.png'
    const sampleImages = samples?.map(s => typeof s.image === 'object' ? (s.image as Media)?.url : '/images/placeholder.png') || []

    return (
        <section id="custom" className="bg-[#FEFDFB] py-16 md:py-24">
            <div className="container px-4">
                <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
                    <h2 className="text-xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter italic">
                        {title}
                    </h2>
                    <div className="w-20 h-1 bg-[#D4BC9B] mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4 lg:gap-8 max-w-7xl mx-auto items-stretch">
                    {/* Left: Craftsman Image */}
                    <div className="md:col-span-7 lg:col-span-5 relative h-[400px] md:h-auto overflow-hidden rounded-3xl shadow-2xl">
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
                    <div className="md:col-span-5 lg:col-span-2 flex flex-col gap-4">
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
                    <div className="md:col-span-12 lg:col-span-5 bg-[#F5F2EA] p-8 md:p-12 rounded-[2.5rem] shadow-xl flex flex-col gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xl md:text-3xl font-black text-gray-900 leading-tight uppercase tracking-tighter">
                                {formTitle}
                            </h3>
                            <p className="text-sm text-gray-600 font-bold tracking-widest italic">
                                {formSubtitle}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger className="w-full bg-white border border-gray-200 rounded-full px-8 py-7 text-[10px] font-black tracking-[0.2em] text-gray-900 focus:border-[#D4BC9B] focus:ring-1 focus:ring-[#D4BC9B] transition-all cursor-pointer outline-none h-auto shadow-none">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                                    {categoryOptions.map((opt, i) => (
                                        <SelectItem
                                            key={i}
                                            value={opt}
                                            className="px-8 py-4 text-[10px] font-black tracking-[0.2em] text-gray-900 focus:bg-[#F5F2EA] focus:text-[#D4BC9B] cursor-pointer transition-colors"
                                        >
                                            {opt}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={style} onValueChange={setStyle}>
                                <SelectTrigger className="w-full bg-white border border-gray-200 rounded-full px-8 py-7 text-[10px] font-black tracking-[0.2em] text-gray-900 focus:border-[#D4BC9B] focus:ring-1 focus:ring-[#D4BC9B] transition-all cursor-pointer outline-none h-auto shadow-none">
                                    <SelectValue placeholder="Select Style" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                                    {styleOptions.map((opt, i) => (
                                        <SelectItem
                                            key={i}
                                            value={opt}
                                            className="px-8 py-4 text-[10px] font-black tracking-[0.2em] text-gray-900 focus:bg-[#F5F2EA] focus:text-[#D4BC9B] cursor-pointer transition-colors"
                                        >
                                            {opt}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <div className="md:col-span-2 lg:col-span-1">
                                <textarea
                                    value={textures}
                                    onChange={(e) => setTextures(e.target.value)}
                                    placeholder="Describe your textures, dimensions, or specific requirements..."
                                    rows={4}
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-5 text-xs font-black tracking-widest text-gray-900 focus:ring-2 focus:ring-[#D4BC9B] transition-all resize-none placeholder:text-gray-400"
                                />
                            </div>

                            <div className="md:col-span-2 lg:col-span-1">
                                <button
                                    onClick={handleInquiry}
                                    className="w-full group bg-black hover:bg-[#D4BC9B] text-white hover:text-black py-7 rounded-full font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl active:scale-95"
                                >
                                    Request Bespoke Design
                                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
