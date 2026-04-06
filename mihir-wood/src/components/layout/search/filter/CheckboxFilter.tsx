'use client'

import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

type Props = {
    items: { id: string; label: string; count?: number }[]
    paramName: string
}

export const CheckboxFilter: React.FC<Props> = ({ items, paramName }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    // Support multiple values (comma separated) or single value
    const currentValues = searchParams.get(paramName)?.split(',') || []

    const handleToggle = (id: string, checked: boolean) => {
        const params = new URLSearchParams(searchParams.toString())

        let newValues: string[]
        if (checked) {
            newValues = [...currentValues, id]
        } else {
            newValues = currentValues.filter((v) => v !== id)
        }

        if (newValues.length > 0) {
            params.set(paramName, newValues.join(','))
        } else {
            params.delete(paramName)
        }

        // Reset page when filter changes
        params.delete('page')

        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="space-y-3">
            {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                        id={item.id}
                        checked={currentValues.includes(item.id)}
                        onCheckedChange={(checked) => handleToggle(item.id, checked as boolean)}
                        className="border-neutral-300 data-[state=checked]:bg-[#D4BC9B] data-[state=checked]:border-[#D4BC9B]"
                    />
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
