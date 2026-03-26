'use client'

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
export function MobileFilters({ children, totalDocs }: { children: React.ReactNode; totalDocs?: number }) {
    return (
        <div className="flex items-center gap-1.5 md:hidden">
            <Dialog>
                <DialogTrigger asChild>
                    <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-neutral-200 rounded-lg shadow-sm text-[9px] font-black uppercase tracking-wider text-gray-700 hover:border-black transition-all active:scale-95">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                            />
                        </svg>
                        Filter & Sort
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] !bg-[#F9F7F2] border-0 p-0 overflow-hidden rounded-2xl">
                    <DialogHeader className="p-6 pb-2">
                        <DialogTitle className="text-sm font-black uppercase tracking-[0.2em] text-gray-900">Filters</DialogTitle>
                    </DialogHeader>
                    <div className="p-4 overflow-y-auto max-h-[70vh]">
                        {children}
                    </div>
                </DialogContent>
            </Dialog>
            {totalDocs !== undefined && (
                <p className="text-[9px] font-black text-neutral-400 uppercase tracking-wider whitespace-nowrap">
                    {totalDocs} Products
                </p>
            )}
        </div>
    )
}
