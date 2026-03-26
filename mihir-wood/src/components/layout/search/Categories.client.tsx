'use client'
import React, { useCallback, useMemo } from 'react'

import { Category } from '@/payload-types'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import clsx from 'clsx'

import { CategoryWithChildren } from './Categories'

type Props = {
  category: CategoryWithChildren
  depth?: number
}

export const CategoryItem: React.FC<Props> = ({ category, depth = 0 }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isActive = useMemo(() => {
    return searchParams.get('category') === String(category.id)
  }, [category.id, searchParams])

  const setQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (isActive) {
      params.delete('category')
    } else {
      params.set('category', String(category.id))
    }

    const newParams = params.toString()

    router.push(pathname + '?' + newParams)
  }, [category.id, isActive, pathname, router, searchParams])

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setQuery()}
        className={clsx(
          'flex items-start gap-2 hover:cursor-pointer text-left py-1.5 transition-all text-[11px] uppercase tracking-wider font-bold',
          {
            'text-black': isActive,
            'text-gray-500 hover:text-black': !isActive,
            'opacity-70': depth > 0,
          },
        )}
        style={{ paddingLeft: `${depth * 0.5}rem` }}
      >
        <div
          className={clsx("w-1.5 h-1.5 rounded-full bg-[#D4BC9B] flex-shrink-0 mt-[5px]", { "opacity-0": !isActive })}
        />
        <span className="whitespace-normal break-words">{category.title}</span>
      </button>
      {category.children && category.children.length > 0 && (
        <div className="flex flex-col">
          {category.children.map((child) => (
            <CategoryItem key={child.id} category={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
