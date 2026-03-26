import type { Product, ProductSectionBlock } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { ProductSectionClient } from './Component.client'

export const ProductSection: React.FC<ProductSectionBlock> = async (props) => {
    const { title, subtitle, layout, populateBy, categories, limit, selectedProducts } = props

    const payload = await getPayload({ config: configPromise })
    let products: Product[] = []

    if (populateBy === 'collection') {
        const categoryIds = categories?.map((cat) => (typeof cat === 'object' ? cat.id : cat))

        const fetchedProducts = await payload.find({
            collection: 'products',
            depth: 1,
            limit: limit || 8,
            ...(categoryIds && categoryIds.length > 0 ? {
                where: {
                    categories: {
                        in: categoryIds,
                    }
                }
            } : {})
        })
        products = fetchedProducts.docs
    } else {
        products = (selectedProducts?.map((item) => (typeof item === 'object' ? item : null)).filter(Boolean) as Product[]) || []
    }

    if (products.length === 0) return null

    return (
        <ProductSectionClient
            title={title}
            subtitle={subtitle}
            layout={layout}
            products={products}
        />
    )
}
