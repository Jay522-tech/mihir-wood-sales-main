'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'

export const HaveliHero: React.FC<Page['hero']> = ({ links, media, richText, subTitle }) => {
    const { setHeaderTheme } = useHeaderTheme()

    useEffect(() => {
        setHeaderTheme('dark')
    })

    return (
        <div
            className="relative flex items-center justify-center text-white"
            data-theme="dark"
        >
            <div className="container mb-8 z-10 relative flex flex-col justify-center">
                <div className="max-w-[45rem]">
                    {subTitle && <p className="mb-4 text-sm font-bold uppercase tracking-widest">{subTitle}</p>}
                    {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
                    {Array.isArray(links) && links.length > 0 && (
                        <ul className="flex gap-4">
                            {links.map(({ link }, i) => {
                                return (
                                    <li key={i}>
                                        <CMSLink {...link} />
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </div>
            <div className="min-h-[70vh] select-none">
                {media && typeof media === 'object' && (
                    <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
                )}
            </div>
        </div>
    )
}
