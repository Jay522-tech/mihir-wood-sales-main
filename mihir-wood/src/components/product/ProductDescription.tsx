"use client"

import type { Product, Variant } from '@/payload-types'
import React, { Suspense, useState } from 'react'

import { Price } from '@/components/Price'
import { Button } from '@/components/ui/button'

import { StockIndicator } from '@/components/product/StockIndicator'
import { formatProductMessage, getWhatsAppLink } from '@/utilities/whatsapp'
import { useCurrency } from '@payloadcms/plugin-ecommerce/client/react'
import { VariantSelector } from './VariantSelector'

import { MessageCircle, Share2, Star } from 'lucide-react'

import { ShareModal } from './ShareModal'

export function ProductDescription({
  product,
  averageRating,
  totalReviews,
}: {
  product: Product
  averageRating?: number
  totalReviews?: number
}) {
  const { currency } = useCurrency()
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  let amount = 0,
    lowestAmount = 0,
    highestAmount = 0
  const priceField = `priceIn${currency.code}` as keyof Product
  const hasVariants = product.enableVariants && Boolean(product.variants?.docs?.length)

  if (hasVariants) {
    const priceField = `priceIn${currency.code}` as keyof Variant
    const variantsOrderedByPrice = product.variants?.docs
      ?.filter((variant) => variant && typeof variant === 'object')
      .sort((a, b) => {
        if (
          typeof a === 'object' &&
          typeof b === 'object' &&
          priceField in a &&
          priceField in b &&
          typeof a[priceField] === 'number' &&
          typeof b[priceField] === 'number'
        ) {
          return a[priceField] - b[priceField]
        }

        return 0
      }) as Variant[]

    if (variantsOrderedByPrice.length > 0) {
      const lowestVariant = variantsOrderedByPrice[0][priceField]
      const highestVariant = variantsOrderedByPrice[variantsOrderedByPrice.length - 1][priceField]
      if (typeof lowestVariant === 'number' && typeof highestVariant === 'number') {
        lowestAmount = lowestVariant
        highestAmount = highestVariant
      }
    }
  } else if (product[priceField] && typeof product[priceField] === 'number') {
    amount = product[priceField]
  }

  const handleInquiry = (e: React.MouseEvent) => {
    e.preventDefault()
    const message = formatProductMessage(product)
    const link = getWhatsAppLink(message)
    window.open(link, '_blank')
  }

  const handleShare = () => {
    setIsShareModalOpen(true)
  }


  const displayRating = averageRating && averageRating > 0 ? averageRating : (product.rating || 5)
  const displayReviewCount = totalReviews && totalReviews > 0 ? totalReviews : (product.reviewCount || 126)

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 leading-tight">
          {product.title}
        </h1>

        <div className="text-xl sm:text-2xl md:text-3xl font-serif text-neutral-900">
          {hasVariants ? (
            <Price highestAmount={highestAmount} lowestAmount={lowestAmount} />
          ) : (
            <Price amount={amount} />
          )}
        </div>

        {/* Ratings Summary */}
        <div className="flex items-center gap-3">
          <div className="flex text-[#D4BC9B]">
            {[...Array(Math.round(displayRating))].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <span className="text-sm text-neutral-500 font-medium">({displayReviewCount} Reviews)</span>
        </div>
      </div>

      <div className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed italic">
        {product.shortDescription || "Exquisite solid wood chest designed with intricate Haveli-inspired hand carvings, adding a touch of timeless elegance to your home."}
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 bg-neutral-900 hover:bg-[#D4BC9B] text-white hover:text-black border-transparent rounded-lg text-[10px] uppercase font-black tracking-widest h-12 transition-all duration-300 group"
        >
          <Share2 size={16} className="text-[#D4BC9B] group-hover:text-black" />
          Share
        </Button>
        <Button
          onClick={handleInquiry}
          className="flex-[1.5] flex items-center justify-center gap-2 bg-neutral-900 hover:bg-[#D4BC9B] text-white hover:text-black border-transparent rounded-lg text-[10px] uppercase font-black tracking-widest h-12 group transition-all duration-300"
        >
          <MessageCircle size={16} className="text-[#D4BC9B] group-hover:text-black text-center" />
          Inquiry On Whatsapp
        </Button>
      </div>

      {/* Call to Order Banner */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#B68C5A] to-[#D4BC9B] p-[1px]">
        <div className="bg-white flex items-stretch h-14 rounded-[7px] overflow-hidden">
          <div className="bg-[#B68C5A] text-white flex items-center justify-center px-4 md:px-6 text-[9px] md:text-[10px] uppercase font-black tracking-widest whitespace-nowrap">
            Call to Order
          </div>
          <div className="flex-1 flex items-center justify-center bg-[#D4BC9B]/5 font-serif text-base md:text-xl text-neutral-900 tracking-wider">
            +91 98765 43210
          </div>
        </div>
      </div>


      {hasVariants && (
        <div className="pt-6 border-t border-neutral-100">
          <Suspense fallback={null}>
            <VariantSelector product={product} />
          </Suspense>
        </div>
      )}

      <div className="flex items-center pt-4">
        <Suspense fallback={null}>
          <StockIndicator product={product} />
        </Suspense>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        product={{
          title: product.title,
          description: product.description,
          url: `/products/${product.slug}`,
        }}
      />
    </div>
  )
}
