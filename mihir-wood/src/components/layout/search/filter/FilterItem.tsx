'use client'

import type { SortFilterItem as SortFilterItemType } from '@/lib/constants'

import { createUrl } from '@/utilities/createUrl'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

import type { ListItem } from '.'
import type { PathFilterItem as PathFilterItemType } from '.'

function PathFilterItem({ item }: { item: PathFilterItemType }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active = pathname === item.path
  const newParams = new URLSearchParams(searchParams.toString())

  newParams.delete('q')

  const className = clsx(
    'flex items-start gap-2 w-full text-[11px] uppercase tracking-wider font-bold transition-all py-1.5',
    {
      'text-black': active,
      'text-gray-500 hover:text-black': !active,
    },
  )

  return (
    <li className="mt-1 flex text-black" key={item.title}>
      {active ? (
        <div className={className}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4BC9B] flex-shrink-0 mt-[5px]" />
          <span className="whitespace-normal break-words">{item.title}</span>
        </div>
      ) : (
        <Link href={createUrl(item.path, newParams)} className={className}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4BC9B] flex-shrink-0 mt-[5px] opacity-0" />
          <span className="whitespace-normal break-words">{item.title}</span>
        </Link>
      )}
    </li>
  )
}

function SortFilterItem({ item }: { item: SortFilterItemType }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active = searchParams.get('sort') === item.slug
  const q = searchParams.get('q')
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug }),
    }),
  )

  const className = clsx(
    'flex items-start gap-2 w-full text-[11px] uppercase tracking-wider font-bold transition-all py-1.5',
    {
      'text-black': active,
      'text-gray-500 hover:text-black': !active,
    },
  )

  return (
    <li className="mt-1 flex text-black" key={item.title}>
      {active ? (
        <div className={className}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4BC9B] flex-shrink-0 mt-[5px]" />
          <span className="whitespace-normal break-words">{item.title}</span>
        </div>
      ) : (
        <Link href={href} prefetch={false} className={className}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4BC9B] flex-shrink-0 mt-[5px] opacity-0" />
          <span className="whitespace-normal break-words">{item.title}</span>
        </Link>
      )}
    </li>
  )
}

export function FilterItem({ item }: { item: ListItem }) {
  return 'path' in item ? <PathFilterItem item={item} /> : <SortFilterItem item={item} />
}
