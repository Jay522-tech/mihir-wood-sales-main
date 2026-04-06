import React from 'react'
import { Categories } from '@/components/layout/search/Categories'
import { FilterList } from '@/components/layout/search/filter'
import { sorting } from '@/lib/constants'
import { PriceFilter } from './PriceFilter'
import { FilterSection } from './FilterSection'
import { CheckboxFilter } from './CheckboxFilter'

export function SidebarFilters() {
    return (
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-6">
            <Categories />

            <div className="pt-4 border-t border-neutral-100">
                <FilterSection title="Collections">
                    <CheckboxFilter
                        paramName="featured"
                        items={[{ id: 'true', label: 'Featured Products' }]}
                    />
                    <div className="mt-3">
                        <CheckboxFilter
                            paramName="isNew"
                            items={[{ id: 'true', label: 'New Arrivals' }]}
                        />
                    </div>
                </FilterSection>
            </div>

            <div className="pt-4 border-t border-neutral-100">
                <FilterList list={sorting} title="Sort by" />
            </div>
        </div>
    )
}
