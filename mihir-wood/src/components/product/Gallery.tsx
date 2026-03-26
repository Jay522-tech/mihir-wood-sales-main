'use client'

import { Media } from '@/components/Media'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import type { Product } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
  gallery: NonNullable<Product['gallery']>
}

export const Gallery: React.FC<Props> = ({ gallery }) => {
  const searchParams = useSearchParams()
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  // Sync scroll position when current changes
  React.useEffect(() => {
    if (api) {
      api.scrollTo(current)
    }
  }, [api, current])

  // Handle URL param for initial image
  React.useEffect(() => {
    const imageID = searchParams.get('image')
    if (imageID) {
      const index = gallery.findIndex((item: any) => String(item.id) === imageID)
      if (index !== -1) {
        setCurrent(index)
      }
    }
  }, [searchParams, gallery])

  const scrollPrev = () => {
    const next = (current - 1 + gallery.length) % gallery.length
    setCurrent(next)
  }

  const scrollNext = () => {
    const next = (current + 1) % gallery.length
    setCurrent(next)
  }

  if (!gallery || gallery.length === 0) return null

  return (
    <div className="flex flex-col gap-8">
      {/* Main Image Container */}
      <div className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-white border border-neutral-100 shadow-sm">
        <Media
          resource={gallery[current].image}
          className="w-full h-full"
          imgClassName="w-full h-full object-contain transition-all duration-500 ease-in-out"
        />

      </div>

      {/* Thumbnails Carousel */}
      {gallery.length > 1 && (
        <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-8 md:px-12">
          <Carousel setApi={setApi} className="w-full" opts={{ align: 'start', loop: false }}>
            <CarouselContent className="-ml-4">
              {gallery.map((item: any, i) => {
                if (typeof item.image !== 'object') return null
                return (
                  <CarouselItem key={i} className="pl-4 basis-1/4 sm:basis-1/5">
                    <button
                      onClick={() => setCurrent(i)}
                      className={cn(
                        'relative aspect-square w-full rounded-xl overflow-hidden border-2 transition-all duration-300 bg-white',
                        i === current
                          ? 'border-[#D4BC9B] shadow-md scale-105'
                          : 'border-neutral-100 hover:border-neutral-300 shadow-sm'
                      )}
                    >
                      <Media
                        resource={item.image}
                        fill
                        imgClassName="object-cover"
                      />
                    </button>
                  </CarouselItem>
                )
              })}
            </CarouselContent>

            <CarouselPrevious className="absolute left-2 md:left-0 md:-translate-x-1/2 h-8 w-8 md:h-10 md:w-10 bg-white/90 hover:bg-white text-neutral-900 border border-neutral-200 shadow-md transition-all focus:ring-0 z-20" />
            <CarouselNext className="absolute right-2 md:right-0 md:translate-x-1/2 h-8 w-8 md:h-10 md:w-10 bg-white/90 hover:bg-white text-neutral-900 border border-neutral-200 shadow-md transition-all focus:ring-0 z-20" />
          </Carousel>
        </div>
      )}
    </div>
  )
}
