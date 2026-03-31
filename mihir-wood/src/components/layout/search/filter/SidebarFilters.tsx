import React from 'react'
import { Categories } from '@/components/layout/search/Categories'
import { FilterList } from '@/components/layout/search/filter'
import { sorting } from '@/lib/constants'
import { PriceFilter } from './PriceFilter'

export function SidebarFilters() {
    return (
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-6">
            <Categories />
            <div className="pt-4 border-t border-neutral-100">
                <p className="text-[11px] font-black uppercase tracking-widest text-neutral-400 mb-4">Price Range</p>
                <PriceFilter />
            </div>
            <div className="pt-4 border-t border-neutral-100">
                <FilterList list={sorting} title="Sort by" onlySort />
            </div>
        </div>
    )
}
