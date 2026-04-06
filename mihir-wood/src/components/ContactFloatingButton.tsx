'use client'

import React from 'react'
import Link from 'next/link'
import { Headset } from 'lucide-react'

export const ContactFloatingButton: React.FC = () => {
    return (
        <Link
            href="/contact"
            className="fixed bottom-[6rem] right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#D4BC9B] text-black shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-black hover:text-white shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] border border-white/20 group"
            aria-label="Contact us"
        >
            <Headset size={28} className="transition-transform duration-300 group-hover:rotate-12" />
        </Link>
    )
}
