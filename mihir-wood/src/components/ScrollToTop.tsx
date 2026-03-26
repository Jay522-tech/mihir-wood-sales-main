'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false)

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)
        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])

    return (
        <div className="fixed bottom-24 right-6 z-50">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-[#D4BC9B] hover:text-black shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] border border-white/20"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={24} className="stroke-[3]" />
                </button>
            )}
        </div>
    )
}
