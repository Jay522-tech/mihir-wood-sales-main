'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/utilities/cn'

function Slider({
    className,
    defaultValue,
    value,
    onValueChange,
    ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
    return (
        <SliderPrimitive.Root
            data-slot="slider"
            defaultValue={defaultValue}
            value={value}
            onValueChange={onValueChange}
            className={cn(
                'relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50',
                className,
            )}
            {...props}
        >
            <SliderPrimitive.Track
                data-slot="slider-track"
                className="bg-neutral-200 relative h-1 w-full grow overflow-hidden rounded-full"
            >
                <SliderPrimitive.Range
                    data-slot="slider-range"
                    className="bg-[#D4BC9B] absolute h-full"
                />
            </SliderPrimitive.Track>
            {Array.from({ length: value?.length || defaultValue?.length || 1 }).map((_, i) => (
                <SliderPrimitive.Thumb
                    key={i}
                    data-slot="slider-thumb"
                    className="border-[#D4BC9B] bg-white ring-ring/50 block size-4 shrink-0 rounded-full border-2 shadow-sm transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none"
                />
            ))}
        </SliderPrimitive.Root>
    )
}

export { Slider }
