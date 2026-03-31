import React from 'react'

export const AnnouncementBar: React.FC<{ text?: string | null }> = ({ text }) => {
    if (!text) return null;

    return (
        <div className="bg-[#D4BC9B] text-black text-[10px] md:text-xs py-1 px-4 text-center uppercase tracking-widest font-medium">
            {text}
        </div>
    )
}
