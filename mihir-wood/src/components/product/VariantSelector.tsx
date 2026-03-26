'use client'

import React from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { createUrl } from '@/utilities/createUrl'
import { cn } from '@/utilities/cn'
import type { Product, Variant } from '@/payload-types'

export function VariantSelector({ product }: { product: Product }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const variants = product.variants?.docs
  const variantTypes = product.variantTypes
  const hasVariants = Boolean(product.enableVariants && variants?.length && variantTypes?.length)

  if (!hasVariants) {
    return null
  }

  return variantTypes?.map((type: any) => {
    if (!type || typeof type !== 'object') {
      return null
    }

    const options = type.options?.docs

    if (!options || !Array.isArray(options) || !options.length) {
      return null
    }

    return (
      <dl className="space-y-4" key={type.id}>
        <dt className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">
          Select {type.label}
        </dt>
        <dd className="flex flex-wrap gap-2">
          {options?.map((option: any) => {
            if (!option || typeof option !== 'object') {
              return null
            }

            const optionID = option.id
            const optionKeyLowerCase = type.name

            const optionSearchParams = new URLSearchParams(searchParams.toString())
            optionSearchParams.delete('variant')
            optionSearchParams.delete('image')
            optionSearchParams.set(optionKeyLowerCase, String(optionID))

            const currentOptions = Array.from(optionSearchParams.values())
            let isAvailableForSale = true

            if (variants) {
              const matchingVariant = variants
                .filter((variant): variant is Variant => typeof variant === 'object')
                .find((variant) => {
                  if (!variant.options || !Array.isArray(variant.options)) return false
                  return variant.options.every((variantOption: any) => {
                    if (typeof variantOption !== 'object')
                      return currentOptions.includes(String(variantOption))
                    return currentOptions.includes(String(variantOption.id))
                  })
                })

              if (matchingVariant) {
                optionSearchParams.set('variant', String(matchingVariant.id))
                isAvailableForSale = (matchingVariant.inventory ?? 0) > 0
              }
            }

            const optionUrl = createUrl(pathname, optionSearchParams)
            const isActive = searchParams.get(optionKeyLowerCase) === String(optionID)

            return (
              <button
                key={option.id}
                disabled={!isAvailableForSale && !isActive}
                onClick={() => {
                  router.replace(`${optionUrl}`, { scroll: false })
                }}
                className={cn(
                  "px-6 py-2.5 text-[9px] font-black uppercase tracking-[0.15em] rounded-full border transition-all duration-500",
                  isActive
                    ? "bg-[#D4BC9B] border-[#D4BC9B] text-white shadow-sm scale-105"
                    : "bg-white border-neutral-200 text-neutral-500 hover:border-black hover:text-black hover:bg-neutral-50",
                  !isAvailableForSale && !isActive && "opacity-20 cursor-not-allowed grayscale"
                )}
                title={`${option.label} ${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
              >
                {option.label}
              </button>
            )
          })}
        </dd>
      </dl>
    )
  })
}
