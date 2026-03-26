'use client'

import React from 'react'
import clsx from 'clsx'

type Props = {
    colors: { id: string; hex: string; name: string }[]
}

export const ColorFilter: React.FC<Props> = ({ colors }) => {
    const [selected, setSelected] = React.useState<string[]>([])

    const toggle = (id: string) => {
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
    }

    return (
        <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
                <button
                    key={color.id}
                    onClick={() => toggle(color.id)}
                    className={clsx(
                        "w-6 h-6 rounded-full border-2 transition-all p-0.5",
                        selected.includes(color.id) ? "border-[#D4BC9B] scale-110 shadow-sm" : "border-transparent hover:scale-105"
                    )}
                    title={color.name}
                >
                    <div
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: color.hex }}
                    />
                </button>
            ))}
        </div>
    )
}
