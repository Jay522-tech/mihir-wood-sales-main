import React from 'react'

import type { Page } from '@/payload-types'

import { HaveliHero } from '@/heros/HaveliHero'
import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { SliderHero } from '@/heros/Slider'

const heroes = {
  highImpact: HighImpactHero,
  haveli: HaveliHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  slider: SliderHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
