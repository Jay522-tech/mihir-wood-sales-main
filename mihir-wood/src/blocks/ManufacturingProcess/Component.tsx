'use client'
import { Hammer, PenTool, Trees, Truck } from 'lucide-react'
import React from 'react'

const iconMap = {
    trees: Trees,
    pentool: PenTool,
    hammer: Hammer,
    truck: Truck,
}

export const ManufacturingProcess: React.FC<any> = (props) => {
    const { title, subtitle, steps } = props

    if (!steps || steps.length === 0) return null

    return (
        <section className="bg-white py-16 md:py-24">
            <div className="container px-4">
                <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter italic">
                        {title}
                    </h2>
                    <p className="text-xs md:text-sm font-bold text-[#D4BC9B] uppercase tracking-[0.4em]">
                        {subtitle}
                    </p>
                    <div className="w-20 h-1 bg-[#D4BC9B] mx-auto opacity-50" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                    {/* Connection Line (Desktop) */}
                    <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gray-100 z-0" />

                    {steps.map((step: any, i: number) => {
                        const IconComponent = step.icon ? iconMap[step.icon as keyof typeof iconMap] : null

                        return (
                            <div key={i} className="flex flex-col items-center text-center space-y-6 relative z-10 group">
                                <div className="w-20 h-20 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center text-[#D4BC9B] group-hover:border-[#D4BC9B] group-hover:bg-[#D4BC9B] group-hover:text-white transition-all duration-500 shadow-xl relative z-10">
                                    {IconComponent && <IconComponent size={32} />}
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight italic">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-[240px]">
                                        {step.description}
                                    </p>
                                </div>
                                {/* Step Number */}
                                <div className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl font-black text-gray-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 pointer-events-none select-none">
                                    0{i + 1}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
