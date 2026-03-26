'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Breadcrumb = {
    label: string
    href?: string
}

type Props = {
    items: Breadcrumb[]
}

export const Breadcrumbs: React.FC<Props> = ({ items }) => {
    return (
        <nav className="flex flex-wrap items-center gap-y-2 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-neutral-400">
            <Link href="/" className="hover:text-black transition-colors whitespace-nowrap">
                Home
            </Link>

            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ChevronRight size={10} className="mx-1 text-neutral-300 flex-shrink-0" />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-black transition-colors whitespace-nowrap"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-neutral-900 whitespace-nowrap truncate max-w-[200px] md:max-w-none">
                            {item.label}
                        </span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    )
}
