import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { cn } from '@/utilities/cn'

export const OpenCartButton = React.forwardRef<
  HTMLButtonElement,
  {
    className?: string
    quantity?: number
  }
>(({ className, quantity, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'relative flex items-center justify-center hover:cursor-pointer group p-1.5 transition-colors text-gray-700 hover:text-black',
        className,
      )}
      {...rest}
    >
      <ShoppingCart
        className="w-[22px] h-[22px] transition-transform group-hover:scale-105"
        strokeWidth={1.7}
      />
      <span
        className={cn(
          'absolute -top-0.5 -right-0.5 text-[10px] min-w-[16px] h-[16px] flex items-center justify-center rounded-full font-bold px-1 transition-all',
          quantity ? 'bg-black text-white' : 'bg-gray-100 text-gray-400',
        )}
      >
        {quantity || 0}
      </span>
    </button>
  )
})

OpenCartButton.displayName = 'OpenCartButton'
