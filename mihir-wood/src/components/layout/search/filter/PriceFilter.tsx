'use client'

import React, { useEffect, useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Check } from 'lucide-react'

export const PriceFilter: React.FC = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const initialMin = parseInt(searchParams.get('minPrice') || '0')
    const initialMax = parseInt(searchParams.get('maxPrice') || '500000')

    const [minInput, setMinInput] = useState(initialMin.toString())
    const [maxInput, setMaxInput] = useState(initialMax.toString())
    const [range, setRange] = useState([initialMin, initialMax])

    useEffect(() => {
        setMinInput(initialMin.toString())
        setMaxInput(initialMax.toString())
        setRange([initialMin, initialMax])
    }, [initialMin, initialMax])

    const updateUrl = (min: number, max: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('minPrice', min.toString())
        params.set('maxPrice', max.toString())
        params.delete('page')
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    const handleApply = () => {
        const min = Math.max(0, parseInt(minInput) || 0)
        const max = Math.max(min, Math.min(500000, parseInt(maxInput) || 500000))
        setMinInput(min.toString())
        setMaxInput(max.toString())
        setRange([min, max])
        updateUrl(min, max)
    }

    const handleSliderChange = (newValues: number[]) => {
        setRange(newValues)
        setMinInput(newValues[0].toString())
        setMaxInput(newValues[1].toString())
    }

    const handleSliderCommit = (newValues: number[]) => {
        updateUrl(newValues[0], newValues[1])
    }

    const handleInputChange = (type: 'min' | 'max', value: string) => {
        const cleanValue = value.replace(/[^0-9]/g, '')
        if (type === 'min') setMinInput(cleanValue)
        else setMaxInput(cleanValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleApply()
    }

    return (
        <div className="space-y-6">
            <div className="flex items-end gap-2">
                <div className="flex-1 space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Min</label>
                    <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-neutral-400">₹</span>
                        <Input
                            value={minInput}
                            onChange={(e) => handleInputChange('min', e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="pl-6 pr-2 h-8 text-[11px] font-bold border-neutral-200 bg-white text-black focus-visible:ring-[#D4BC9B]/20 focus-visible:border-[#D4BC9B] transition-all shadow-none"
                        />
                    </div>
                </div>
                <div className="flex-1 space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Max</label>
                    <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-neutral-400">₹</span>
                        <Input
                            value={maxInput}
                            onChange={(e) => handleInputChange('max', e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="pl-6 pr-2 h-8 text-[11px] font-bold border-neutral-200 bg-white text-black focus-visible:ring-[#D4BC9B]/20 focus-visible:border-[#D4BC9B] transition-all shadow-none"
                        />
                    </div>
                </div>
                <Button
                    onClick={handleApply}
                    size="icon"
                    className="h-8 w-8 bg-[#D4BC9B] hover:bg-black text-white shrink-0"
                >
                    <Check size={14} className="stroke-[3]" />
                </Button>
            </div>

            <Slider
                max={500000}
                step={1000}
                value={range}
                onValueChange={handleSliderChange}
                onValueCommit={handleSliderCommit}
                className="mt-2"
            />
        </div>
    )
}
