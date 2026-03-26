'use client'

import React from 'react'

type Props = {
    title: string
    subtitle?: string
    backgroundImage?: string
}

export const HeroBanner: React.FC<Props> = ({ title, subtitle, backgroundImage }) => {
    return (
        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{
                    backgroundImage: `url(${backgroundImage || '/placeholder-banner.jpg'})`,
                }}
            />
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-[0.2em] mb-4 drop-shadow-lg">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-sm md:text-lg text-white/90 uppercase tracking-[0.4em] font-medium drop-shadow-md">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    )
}
