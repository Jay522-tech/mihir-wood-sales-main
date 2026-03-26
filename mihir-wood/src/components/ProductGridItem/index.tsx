'use client'

import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import type { Product } from '@/payload-types'
import { formatProductMessage, getWhatsAppLink } from '@/utilities/whatsapp'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  product: Partial<Product>
}

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { gallery, priceInINR, title, slug } = product

  let price = priceInINR

  const variants = product.variants?.docs

  if (variants && variants.length > 0) {
    const variant = variants[0]
    if (
      variant &&
      typeof variant === 'object' &&
      variant?.priceInINR &&
      typeof variant.priceInINR === 'number'
    ) {
      price = variant.priceInINR
    }
  }

  const image =
    gallery?.[0]?.image && typeof gallery[0]?.image !== 'string' ? gallery[0]?.image : false

  const handleInquiry = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const message = formatProductMessage({ title, priceInINR: price, slug })
    const link = getWhatsAppLink(message)
    window.open(link, '_blank')
  }

  return (
    <div className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/products/${slug}`} className="relative aspect-square w-full overflow-hidden">
        {image ? (
          <Media
            fill
            imgClassName="object-cover transition-transform duration-700 group-hover:scale-110"
            resource={image}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest text-xs">
            No Image
          </div>
        )}

        {/* Hover Overlay with Quick View or similar if needed, but keeping it simple for now */}
      </Link>

      <div className="flex flex-col p-3 gap-1 flex-grow">
        <Link href={`/products/${slug}`}>
          <h3 className="text-[10px] sm:text-xs lg:text-sm font-black text-neutral-900 uppercase tracking-wider leading-tight line-clamp-2 md:line-clamp-3 min-h-[2rem] md:min-h-[3rem] hover:text-[#D4BC9B] transition-colors">
            {title}
          </h3>
        </Link>
        <div className="flex flex-col gap-0.5">
          <div className="text-sm sm:text-base lg:text-lg font-black text-gray-900">
            {typeof price === 'number' && <Price amount={price} />}
          </div>

          {/* Star Ratings (Dummy for now) */}
          <div className="flex items-center gap-1 text-[#D4BC9B]">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-[10px] text-gray-400 font-bold ml-1">(12)</span>
          </div>
        </div>

        <div className="mt-auto pt-2 px-0.5 ">
          <button
            onClick={handleInquiry}
            className="w-full flex items-center px-1 justify-center gap-1 bg-white border border-[#D4BC9B] text-neutral-900 text-[8px] sm:text-[9px] lg:text-[10px] font-black uppercase tracking-tight sm:tracking-widest py-2.5 rounded-lg hover:border-[#D4BC9B] hover:bg-[#D4BC9B] transition-all shadow-sm"
          >
            <MessageCircle size={12} className="stroke-[2.5] flex-shrink-0" />
            <span className="truncate">Inquiry on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  )
}
