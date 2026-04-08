import type { CustomFurnitureBlock } from '@/payload-types'
import React from 'react'
import { CustomFurnitureClient } from './Component.client'

export const CustomFurniture: React.FC<CustomFurnitureBlock> = (props) => {
    return (
        <CustomFurnitureClient
            {...props}
        />
    )
}
