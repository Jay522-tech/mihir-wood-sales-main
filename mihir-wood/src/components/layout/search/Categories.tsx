import configPromise from '@payload-config'
import { getPayload } from 'payload'
import clsx from 'clsx'
import React, { Suspense } from 'react'
import { Category } from '@/payload-types'

import { FilterSection } from './filter/FilterSection'
import { CategoryItem } from './Categories.client'

export type CategoryWithChildren = Category & {
  children?: CategoryWithChildren[]
}

function buildCategoryTree(categories: Category[]): CategoryWithChildren[] {
  const categoryMap: { [key: string]: CategoryWithChildren } = {}
  const tree: CategoryWithChildren[] = []

  categories.forEach((cat) => {
    categoryMap[cat.id] = { ...cat, children: [] }
  })

  categories.forEach((cat) => {
    const parent = cat.parent
    const parentId = typeof parent === 'object' ? parent?.id : parent

    if (parentId && categoryMap[parentId]) {
      categoryMap[parentId].children?.push(categoryMap[cat.id])
    } else {
      tree.push(categoryMap[cat.id])
    }
  })

  return tree
}

async function CategoryList() {
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'categories',
    sort: 'title',
    limit: 1000,
  })

  const categoryTree = buildCategoryTree(categories.docs)

  return (
    <FilterSection title="Categories">
      <ul className="space-y-1">
        {categoryTree.map((category) => {
          return (
            <li key={category.id}>
              <CategoryItem category={category} />
            </li>
          )
        })}
      </ul>
    </FilterSection>
  )
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded'
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300'
const items = 'bg-neutral-400 dark:bg-neutral-700'

export function Categories() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CategoryList />
    </Suspense>
  )
}
