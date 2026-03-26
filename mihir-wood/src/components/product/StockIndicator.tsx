'use client'
import { Product, Variant } from '@/payload-types'
import { AlertCircle, CheckCircle2, Eye } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

type Props = {
  product: Product
}

export const StockIndicator: React.FC<Props> = ({ product }) => {
  const searchParams = useSearchParams()

  const variants = product.variants?.docs || []

  const selectedVariant = useMemo<Variant | undefined>(() => {
    if (product.enableVariants && variants.length) {
      const variantId = searchParams.get('variant')
      const validVariant = variants.find((variant) => {
        if (typeof variant === 'object') {
          return String(variant.id) === variantId
        }
        return String(variant) === variantId
      })

      if (validVariant && typeof validVariant === 'object') {
        return validVariant
      }
    }

    return undefined
  }, [product.enableVariants, searchParams, variants])

  const stockQuantity = useMemo(() => {
    if (product.enableVariants) {
      if (selectedVariant) {
        return selectedVariant.inventory || 0
      }
    }
    return product.inventory || 0
  }, [product.enableVariants, selectedVariant, product.inventory])

  if (product.enableVariants && !selectedVariant) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        {stockQuantity < 10 && stockQuantity > 0 ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fdfaf5] border border-[#f3e6d5] text-[#D4BC9B]">
            <AlertCircle size={14} className="stroke-[2.5px]" />
            <p className="text-[10px] font-black uppercase tracking-[0.15em]">Low Stock - Inquiry Recommended</p>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100/50 text-emerald-600">
            <CheckCircle2 size={14} className="stroke-[2.5px]" />
            <p className="text-[10px] font-black uppercase tracking-[0.15em]">Available for Inquiry</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 px-1">
        <div className="flex items-center gap-2 text-neutral-400">
          <Eye size={12} className="text-[#D4BC9B]" />
          <p className="text-[10px] uppercase font-bold tracking-[0.1em]">
            Over <span className="text-neutral-900">{product.visitCount || 0}</span> people viewed this masterpiece
          </p>
        </div>
      </div>
    </div>
  )
}
