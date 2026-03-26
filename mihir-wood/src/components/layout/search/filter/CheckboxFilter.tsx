'use client'

import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

type Props = {
    items: { id: string; label: string; count?: number }[]
}

export const CheckboxFilter: React.FC<Props> = ({ items }) => {
    return (
        <div className="space-y-3">
            {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox id={item.id} className="border-neutral-300 data-[state=checked]:bg-[#D4BC9B] data-[state=checked]:border-[#D4BC9B]" />
                    <Label
                        htmlFor={item.id}
                        className="text-[11px] font-bold uppercase tracking-wider text-gray-600 cursor-pointer hover:text-black transition-colors"
                    >
                        {item.label} {item.count !== undefined && <span className="text-gray-400 ml-1">({item.count})</span>}
                    </Label>
                </div>
            ))}
        </div>
    )
}
