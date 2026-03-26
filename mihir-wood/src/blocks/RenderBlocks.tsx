import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { AsymmetricalContent } from '@/blocks/AsymmetricalContent/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { BlogArchive } from '@/blocks/BlogArchive/Component'
import { BulkOrderBanner } from '@/blocks/BulkOrderBanner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CarouselBlock } from '@/blocks/Carousel/Component'
import { CategoryCircles } from '@/blocks/CategoryCircles/Component'
import { CategoryGrid } from '@/blocks/CategoryGrid/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { CustomFurniture } from '@/blocks/CustomFurniture/Component'
import { FeatureGrid } from '@/blocks/FeatureGrid/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { InquirySection } from '@/blocks/InquirySection/Component'
import { ManufacturingProcess } from '@/blocks/ManufacturingProcess/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ProductSection } from '@/blocks/ProductSection/Component'
import { ProjectShowcase } from '@/blocks/ProjectShowcase/Component'
import { Reviews } from '@/blocks/Reviews/Component'
import { ReviewsSection } from '@/blocks/ReviewsSection/Component'
import { StoreArchive } from '@/blocks/StoreArchive/Component'
import { ThreeItemGridBlock } from '@/blocks/ThreeItemGrid/Component'
import { TrustStats } from '@/blocks/TrustStats/Component'
import { toKebabCase } from '@/utilities/toKebabCase'
import React, { Fragment } from 'react'

import type { Page } from '../payload-types'

const blockComponents = {
  archive: ArchiveBlock,
  banner: BannerBlock,
  carousel: CarouselBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  threeItemGrid: ThreeItemGridBlock,
  categoryGrid: CategoryGrid,
  reviews: Reviews,
  blogArchive: BlogArchive,
  storeArchive: StoreArchive,
  categoryCircles: CategoryCircles,
  customFurniture: CustomFurniture,
  manufacturingProcess: ManufacturingProcess,
  trustStats: TrustStats,
  inquirySection: InquirySection,
  bulkOrderBanner: BulkOrderBanner,
  productSection: ProductSection,
  reviewsSection: ReviewsSection,
  asymmetricalContent: AsymmetricalContent,
  featureGrid: FeatureGrid,
  projectShowcase: ProjectShowcase,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore - weird type mismatch here */}
                  <Block id={toKebabCase(blockName!)} {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
