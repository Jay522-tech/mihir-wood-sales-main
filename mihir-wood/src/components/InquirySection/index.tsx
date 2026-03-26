'use client'

import React from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'

export const InquirySection: React.FC = () => {
    return (
        <section className="bg-[#FAF9F6] py-16 md:py-24">
            <div className="container px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* Left: Testimonial with Image Overlay */}
                    <div className="relative group">
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                            <Image
                                src="/images/categories/sofa.png" // Using sofa as a room placeholder
                                alt="Room Background"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10" />
                        </div>

                        {/* Floating Testimonial Card */}
                        <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-[300px] md:max-w-[380px] border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 border-[#D4BC9B] relative">
                                    <Image
                                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop"
                                        alt="Priya Sharma"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">Priya Sharma</h4>
                                    <p className="text-xs text-gray-500 font-medium">Verified Customer</p>
                                </div>
                            </div>
                            <p className="text-gray-800 font-bold text-sm md:text-base leading-relaxed mb-4 italic">
                                "Our custom teak bed is a masterpiece! The craftsmanship is truly world-class."
                            </p>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-[#D4BC9B] text-[#D4BC9B]" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Inquiry Form */}
                    <div className="bg-[#E8E4D9]/30 p-8 md:p-12 lg:p-16 rounded-[2.5rem] shadow-sm border border-white/40">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 tracking-tight">
                            Inquiry Form
                        </h2>

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
