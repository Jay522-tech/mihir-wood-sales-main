import React from 'react'

import type { Page } from '@/payload-types'

import { RichText } from '@/components/RichText'

type LowImpactHeroType =
  | {
    children?: React.ReactNode
    richText?: never
    subTitle?: string | null
  }
  | (Omit<Page['hero'], 'richText'> & {
    children?: never
    richText?: Page['hero']['richText']
  })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText, subTitle }) => {
  return (
    <div className="container mt-16">
      <div className="max-w-3xl">
        {subTitle && <p className="mb-4 text-sm font-bold uppercase tracking-widest">{subTitle}</p>}
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}
