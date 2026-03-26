'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import type { Page } from '@/payload-types'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import AutoScroll from 'embla-carousel-auto-scroll'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'

export const SliderHero: React.FC<Page['hero']> = ({ slides, speed }) => {
    const { setHeaderTheme } = useHeaderTheme()

    useEffect(() => {
        setHeaderTheme('dark')
    }, [setHeaderTheme])

    if (!slides || slides.length === 0) return null

    return (
        <Carousel
            className="relative w-full text-white"
            opts={{ loop: true, dragFree: true }}
            plugins={[
                AutoScroll({
                    playOnInit: true,
                    speed: speed || 1,
                    stopOnInteraction: false,
                    stopOnMouseEnter: true,
                }),
            ]}
            data-theme="dark"
        >
            <CarouselContent className="ml-0">
                {slides.map((slide, i) => (
                    <CarouselItem key={i} className="relative pl-0 flex items-center justify-center min-h-[80vh] basis-full">
                        <div className="container z-10 relative flex items-center justify-center">
                            <div className="max-w-146 md:text-center text-white">
                                {slide.subTitle && <p className="mb-4 text-sm font-bold uppercase tracking-widest">{slide.subTitle}</p>}
                                {slide.richText && <RichText className="mb-6" data={slide.richText} enableGutter={false} />}
                                {Array.isArray(slide.links) && slide.links.length > 0 && (
                                    <ul className="flex md:justify-center gap-4">
                                        {slide.links.map(({ link }, j) => (
                                            <li key={j}>
                                                <CMSLink {...link} />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        {slide.media && typeof slide.media === 'object' && (
                            <Media fill imgClassName="-z-10 object-cover" priority={i === 0} resource={slide.media} />
                        )}
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
