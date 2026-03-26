'use client'

import React from 'react'
import { Slider } from '@/components/ui/slider' // Assuming Slider is imported from here

export const PriceFilter: React.FC = () => {
    const [range, setRange] = React.useState([7, 37])

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-[#D4BC9B]">
                <span>₹{range[0]}.00</span>
                <span>-</span>
                <span>₹{range[1]}.00</span>
            </div>

            <Slider
                defaultValue={[7, 37]}
                max={100}
                step={1}
                value={range}
                onValueChange={setRange}
                className="mt-2"
            />
        </div>
    )
}
