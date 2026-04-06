import React from 'react'

import type { Page } from '@/payload-types'

import { BannerHero } from '@/heros/BannerHero'
import { LowImpactHero } from '@/heros/LowImpact'

const heroes = {
  banner: BannerHero,
  lowImpact: LowImpactHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = type in heroes ? heroes[type as keyof typeof heroes] : null

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
