import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export const HaveliHero: React.FC = () => {
    return (
        <div className="relative w-full h-[70vh] overflow-hidden flex items-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/haveli-hero-bg.png"
                    alt="Haveli Luxurious Living Room"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content */}
            <div className="container relative z-10 px-4 md:px-8">
                <div className="max-w-3xl space-y-6">
                    <div className="space-y-2">
                        <span className="text-white/90 text-xs md:text-sm font-bold uppercase tracking-[0.3em] block">
                            EMBRACE TIMELESS ELEGANCE.
                        </span>
                        <h1 className="text-white text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
                            Crafted Traditions for <br /> Modern Homes.
                        </h1>
                    </div>

                    <p className="text-white/80 text-lg md:text-xl font-medium max-w-xl">
                        Explore Haveli collection and Bespoke services.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button
                            className="bg-[#D4BC9B] hover:bg-[#C2AA8A] text-black font-bold h-14 px-8 rounded-none transition-all"
                        >
                            Explore Haveli Collection
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-bold h-14 px-8 rounded-none transition-all"
                        >
                            Request Bespoke Pricing
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
