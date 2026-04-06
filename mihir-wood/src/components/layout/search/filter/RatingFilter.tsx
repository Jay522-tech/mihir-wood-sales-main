'use client'

import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import clsx from 'clsx'

export const RatingFilter: React.FC = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const currentRating = searchParams.get('rating')

    const ratings = [5, 4, 3]

    const handleToggle = (rating: number, checked: boolean) => {
        const params = new URLSearchParams(searchParams.toString())

        if (checked) {
            params.set('rating', rating.toString())
        } else {
            params.delete('rating')
        }

        // Reset page when filter changes
        params.delete('page')

        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="space-y-3">
            {ratings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                        id={`rating-${rating}`}
                        checked={currentRating === rating.toString()}
                        onCheckedChange={(checked) => handleToggle(rating, checked as boolean)}
                        className="border-neutral-300 data-[state=checked]:bg-[#D4BC9B] data-[state=checked]:border-[#D4BC9B]"
                    />
                    <Label
                        htmlFor={`rating-${rating}`}
                        className="flex items-center cursor-pointer group"
                    >
                        <div className="flex gap-0.5 text-[#D4BC9B]">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={clsx("w-3 h-3 fill-current", i < rating ? "text-[#D4BC9B]" : "text-gray-200")}
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-[11px] text-gray-800 font-bold ml-2">& up</span>
                    </Label>
                </div>
            ))}
        </div>
    )
}
