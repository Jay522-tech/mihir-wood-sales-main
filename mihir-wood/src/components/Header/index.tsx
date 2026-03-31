import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Category } from '@/payload-types'

import './index.css'
import { HeaderClient } from './index.client'
import { AnnouncementBar } from '../AnnouncementBar'

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

export async function Header() {
  const header = await getCachedGlobal('header', 1)()
  const payload = await getPayload({ config: configPromise })

  const categoriesDocs = await payload.find({
    collection: 'categories',
    sort: 'title',
    limit: 1000,
  })

  const categoryTree = buildCategoryTree(categoriesDocs.docs)

  return (
    <>
      <AnnouncementBar text={header.promotionText} />
      <HeaderClient header={header} categoryTree={categoryTree} />
    </>
  )
}
