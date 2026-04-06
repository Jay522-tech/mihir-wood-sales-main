'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React from 'react'
import type { Page } from '@/payload-types'
import { Carousel, CarouselContent, CarouselItem, CarouselDots, type CarouselApi } from '@/components/ui/carousel'
import { RichText } from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const LowImpactHero: React.FC<Page['hero']> = ({ slides }) => {
  const [api, setApi] = React.useState<CarouselApi>()
  const { setHeaderTheme } = useHeaderTheme()

  // Autoplay logic: move every 3 seconds
  React.useEffect(() => {
    if (!api || !slides || slides.length <= 1) return

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [api, slides?.length])

  if (!slides || slides.length === 0) {
    return (
      <div className="py-20 text-center bg-neutral-100">
        <p className="text-neutral-500">No slides configured for Low Impact Hero</p>
      </div>
    )
  }

  const isSingleSlide = slides.length <= 1

  return (
    <Carousel
      setApi={setApi}
      className="relative w-full overflow-hidden"
      opts={{
        loop: !isSingleSlide,
        watchDrag: !isSingleSlide,
      }}
    >
      <CarouselContent className="ml-0">
        {slides.map((slide, i) => (
          <CarouselItem key={i} className="relative pl-0 flex items-center justify-center aspect-video lg:aspect-auto lg:min-h-[40vh] basis-full bg-neutral-900 overflow-hidden text-center">
            <div className={`px-6 z-10 relative py-8 md:py-12 w-full flex flex-col ${(slide as any).contentAlignment === 'left' ? 'items-start text-left' : (slide as any).contentAlignment === 'right' ? 'items-end text-right' : 'items-center text-center'}`}>
              <div className="max-w-3xl">
                {slide.title && (
                  <h1
                    className="mb-1 md:mb-4 text-lg md:text-4xl lg:text-6xl font-bold font-serif italic tracking-tight"
                    style={{ color: (slide as any).titleColor || '#ffffff' }}
                  >
                    {slide.title}
                  </h1>
                )}
                {slide.subTitle && (
                  <p
                    className="mb-1 md:mb-4 text-[9px] md:text-xs lg:text-sm font-bold uppercase tracking-widest"
                    style={{ color: (slide as any).subTitleColor || '#ffffff' }}
                  >
                    {slide.subTitle}
                  </p>
                )}
                {slide.richText && (
                  <div className="text-[7px] md:text-sm lg:text-base leading-tight md:leading-relaxed" style={{ color: (slide as any).descriptionColor || '#ffffff' }}>
                    <RichText data={slide.richText} enableGutter={false} enableProse={false} />
                  </div>
                )}
                {Array.isArray(slide.links) && slide.links.length > 0 && (
                  <ul className={`flex gap-2 md:gap-4 mt-4 md:mt-8 ${(slide as any).contentAlignment === 'left' ? 'justify-start' : (slide as any).contentAlignment === 'right' ? 'justify-end' : 'justify-center'}`}>
                    {slide.links.map(({ link }, j) => (
                      <li key={j}>
                        <CMSLink
                          {...link}
                          size="sm"
                          className="px-4 py-2 md:px-6 md:py-3 text-[10px] md:text-xs lg:text-base"
                          style={{
                            backgroundColor: (slide as any).buttonBackgroundColor || '#D4BC9B',
                            color: (slide as any).buttonTextColor || '#000000'
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {(slide as any).image && typeof (slide as any).image === 'object' && (
              <Media fill imgClassName="-z-10 object-cover opacity-60" priority={i === 0} resource={(slide as any).image} />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <CarouselDots className="[&_button]:bg-white/20 [&_button.bg-white]:bg-white" />
      </div>
    </Carousel>
  )
}
