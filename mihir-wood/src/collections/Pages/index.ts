import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import { Archive } from '@/blocks/ArchiveBlock/config'
import { AsymmetricalContent } from '@/blocks/AsymmetricalContent/config'
import { Banner } from '@/blocks/Banner/config'
import { BrandHeritage } from '@/blocks/BrandHeritage/config'
import { BlogArchive } from '@/blocks/BlogArchive/config'
import { BulkOrderBanner } from '@/blocks/BulkOrderBanner/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { Carousel } from '@/blocks/Carousel/config'
import { CategoryCircles } from '@/blocks/CategoryCircles/config'
import { Content } from '@/blocks/Content/config'
import { CustomFurniture } from '@/blocks/CustomFurniture/config'
import { FeatureGrid } from '@/blocks/FeatureGrid/config'
import { FormBlock } from '@/blocks/Form/config'
import { ContactInfoGrid } from '@/blocks/ContactInfoGrid/config'
import { InquirySection } from '@/blocks/InquirySection/config'
import { ManufacturingProcess } from '@/blocks/ManufacturingProcess/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { ProductSection } from '@/blocks/ProductSection/config'
import { ProjectProcess } from '@/blocks/ProjectProcess/config'
import { ProjectShowcase } from '@/blocks/ProjectShowcase/config'
import { ReviewsBlock } from '@/blocks/Reviews/config'
import { ReviewsSection } from '@/blocks/ReviewsSection/config'
import { StoreArchive } from '@/blocks/StoreArchive/config'
import { ThreeItemGrid } from '@/blocks/ThreeItemGrid/config'
import { TrustStats } from '@/blocks/TrustStats/config'
import { BulkOrderStats } from '@/blocks/BulkOrderStats/config'
import { OneStopShop } from '@/blocks/OneStopShop/config'
import { HowItWorks } from '@/blocks/HowItWorks/config'
import { CustomizationOptions } from '@/blocks/CustomizationOptions/config'
import { FAQBlock } from '@/blocks/FAQBlock/config'
import { hero } from '@/fields/hero'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOrPublishedStatus,
    update: adminOnly,
  },
  admin: {
    group: 'Content',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedOn',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                Carousel,
                ThreeItemGrid,
                Banner,
                BrandHeritage,
                FormBlock,
                ContactInfoGrid,
                ReviewsBlock,
                BlogArchive,
                StoreArchive,
                CategoryCircles,
                CustomFurniture,
                TrustStats,
                ManufacturingProcess,
                InquirySection,
                BulkOrderBanner,
                ProductSection,
                ReviewsSection,
                AsymmetricalContent,
                FeatureGrid,
                ProjectShowcase,
                ProjectProcess,
                BulkOrderStats,
                OneStopShop,
                HowItWorks,
                CustomizationOptions,
                FAQBlock,
              ],
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 50,
  },
}
