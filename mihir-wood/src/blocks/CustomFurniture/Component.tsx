import type { CustomFurnitureBlock } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { CustomFurnitureClient } from './Component.client'

export const CustomFurniture: React.FC<CustomFurnitureBlock> = async (props) => {
    const { categories: selectedCategories } = props
    let categoryTitles: string[] = []

    if (selectedCategories?.length) {
        // Use titles from selected category objects
        categoryTitles = selectedCategories
            .map((cat: any) => typeof cat === 'object' ? cat.title : null)
            .filter(Boolean)
    }

    // Fallback: If no categories selected, fetch all from database
    if (!categoryTitles.length) {
        const payload = await getPayload({ config: configPromise })
        const { docs: allCategories } = await payload.find({
            collection: 'categories',
            depth: 0,
            limit: 100,
            sort: 'title',
        })
        categoryTitles = allCategories.map((cat: any) => cat.title)
    }

    return (
        <CustomFurnitureClient
            {...props}
            dynamicCategories={categoryTitles}
        />
    )
}
