import { ArrowRight, Package } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const BulkOrderBanner: React.FC = () => {
    return (
        <section className="relative w-full py-16 md:py-20 overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1974&auto=format&fit=crop")',
                }}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            </div>

            <div className="container relative z-10 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4BC9B]/20 border border-[#D4BC9B]/30 rounded-full text-[#D4BC9B] text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                        <Package className="w-4 h-4" />
                        <span>Corporate & Bulk Solutions</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter italic">
                        Transform Your Space <br />
                        <span className="text-[#D4BC9B]">At Scale</span>
                    </h2>

                    <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
                        Mihir Wood provides premium bespoke furniture for offices, hotels, and luxury residences.
                        Experience uncompromising quality and timeless wood craftsmanship.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/bulk"
                            className="group bg-[#D4BC9B] hover:bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all duration-300 flex items-center gap-3 shadow-2xl hover:scale-105"
                        >
                            Contact for Bulk Pricing
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="/bulk-orders"
                            className="text-white hover:text-[#D4BC9B] font-bold uppercase tracking-widest text-sm transition-colors flex items-center gap-2 border-b border-white/20 hover:border-[#D4BC9B] pb-1"
                        >
                            View Bulk Portfolio
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BulkOrderBanner
