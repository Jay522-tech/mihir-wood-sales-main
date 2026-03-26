'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

type Props = {
  href: string
  title: string
}

export function Item({ href, title }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active = pathname === href
  const q = searchParams.get('q')
  const className = clsx(
    'w-full font-mono uppercase text-primary/50 px-2 text-sm py-1 rounded-md hover:bg-white/5 hover:text-primary',
    {
      'bg-white/5 text-primary': active,
    },
  )

  return (
    <li className="mt-2 flex text-sm text-black dark:text-white">
      {active ? (
        <div className={className}>{title}</div>
      ) : (
        <Link href={href} prefetch={false} className={className}>
          {title}
        </Link>
      )}
    </li>
  )
}
