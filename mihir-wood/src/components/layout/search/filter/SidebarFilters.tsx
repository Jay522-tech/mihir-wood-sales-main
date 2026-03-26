import React from 'react'
import { Categories } from '@/components/layout/search/Categories'
import { FilterList } from '@/components/layout/search/filter'
import { sorting } from '@/lib/constants'

export function SidebarFilters() {
    return (
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-4">
            <Categories />
            <FilterList list={sorting} title="Sort by" onlySort />
            <FilterList list={[]} onlyFilters />
        </div>
    )
}
