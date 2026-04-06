import type { SortFilterItem } from '@/lib/constants'
import React, { Suspense } from 'react'
import { FilterSection } from './FilterSection'
import { CheckboxFilter } from './CheckboxFilter'
import { ColorFilter } from './ColorFilter'
import { PriceFilter } from './PriceFilter'
import { RatingFilter } from './RatingFilter'

import { FilterItemDropdown } from './FilterItemDropdown'
import { FilterItem } from './FilterItem'

export type ListItem = PathFilterItem | SortFilterItem
export type PathFilterItem = { path: string; title: string }

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <ul className="space-y-1">
      {list.map((item: ListItem, i) => (
        <FilterItem item={item} key={i} />
      ))}
    </ul>
  )
}

export function FilterList({
  list,
  title,
  onlySort,
  onlyFilters
}: {
  list: ListItem[];
  title?: string;
  onlySort?: boolean;
  onlyFilters?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <Suspense fallback={null}>
        {/* Sort Section */}
        {(!onlyFilters) && title && list && (
          <FilterSection title={title}>
            <ul className="hidden md:block">
              <FilterItemList list={list} />
            </ul>
            <ul className="md:hidden">
              <FilterItemDropdown list={list} />
            </ul>
          </FilterSection>
        )}

        {/* Attribute Filters */}
        {(!onlySort) && (
          <>
            {/* Materials Section */}
            <FilterSection title="Materials">
              <CheckboxFilter
                paramName="material"
                items={[
                  { id: 'Teak Wood', label: 'Teak Wood' },
                  { id: 'Rose Wood', label: 'Rose Wood' },
                  { id: 'Natural Teak', label: 'Natural Teak' },
                  { id: 'Ash Wood', label: 'Ash Wood' }
                ]}
              />
            </FilterSection>

            {/* Colors Section */}
            <FilterSection title="Colors">
              <ColorFilter
                colors={[
                  { id: 'brown-1', hex: '#8B4513', name: 'Saddle Brown' },
                  { id: 'brown-2', hex: '#A0522D', name: 'Sienna' },
                  { id: 'brown-3', hex: '#D2691E', name: 'Chocolate' },
                  { id: 'brown-4', hex: '#CD853F', name: 'Peru' },
                  { id: 'brown-5', hex: '#BC8F8F', name: 'Rosy Brown' },
                ]}
              />
            </FilterSection>

            {/* Price Section */}
            <FilterSection title="Price">
              <PriceFilter />
            </FilterSection>

            {/* Ratings Section */}
            <FilterSection title="Ratings">
              <RatingFilter />
            </FilterSection>
          </>
        )}
      </Suspense>
    </div>
  )
}
