'use client'

import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'

type Props = {
    title: string
    children: React.ReactNode
    defaultOpen?: boolean
}

export const FilterSection: React.FC<Props> = ({ title, children, defaultOpen = true }) => {
    return (
        <Accordion type="single" collapsible defaultValue={defaultOpen ? 'item-1' : undefined} className="w-full">
            <AccordionItem value="item-1" className="border-0">
                <AccordionTrigger className="hover:no-underline py-2">
                    <span className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-900">
                        {title}
                    </span>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                    {children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
