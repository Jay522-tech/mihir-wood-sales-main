'use client'
import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'

import type { Header } from 'src/payload-types'
import { MobileMenu } from './MobileMenu'

import { cn } from '@/utilities/cn'
import { createUrl } from '@/utilities/createUrl'
import { Heart, Search, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  header: Header
}
export function HeaderClient({ header }: Props) {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  const router = useRouter()
  const menu = header.navItems || []
  const pathname = usePathname()
  const hardcodedMenu = [
    { label: 'Home', url: '/' },
    { label: 'Collections', url: '/shop' },
    { label: 'Custom', url: '/#custom' },
    { label: 'Bulk', url: '/bulk-orders' },
    { label: 'About', url: '/about' },
  ]

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      const newParams = new URLSearchParams()
      newParams.set('q', searchValue.trim())
      router.push(createUrl('/shop', newParams))
      setIsSearchOpen(false)
      setSearchValue('')
    }
  }

  return (
    <div className="relative z-20 bg-white border-b border-gray-100">
      <nav className="container flex items-center justify-between py-4 uppercase tracking-widest text-[11px] font-bold">
        {/* Mobile menu toggle */}
        <div className="flex items-center md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>

        {/* Logo Section */}
        <div className="flex items-center flex-none">
          <Link href="/" className="flex items-center group overflow-visible">
            <Image
              src="/images/logo.png"
              alt="Mihir Wood"
              width={440}
              height={250}
              className="h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-[2.4] -my-6 scale-[2.2] origin-left"
              priority
            />
          </Link>
        </div>

        {/* Center Navigation / Search Bar */}
        <div className="flex-1 flex justify-center px-4 md:px-12 max-w-4xl transition-all duration-300">
          {isSearchOpen ? (
            <form onSubmit={handleSearchSubmit} className="w-full flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="relative flex-grow">
                <input
                  autoFocus
                  type="text"
                  placeholder="SEARCH FOR MASTERPIECES..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onBlur={() => !searchValue && setIsSearchOpen(false)}
                  className="w-full bg-neutral-50 border border-[#D4BC9B] rounded-full px-8 py-2.5 text-[10px] font-black tracking-[0.3em] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D4BC9B] transition-all shadow-sm"
                />
                <button type="submit" className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#D4BC9B] transition-colors">
                  <Search className="w-4.5 h-4.5 stroke-[2.5]" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-neutral-400 hover:text-black transition-colors p-2 hover:bg-neutral-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          ) : (
            <ul className="hidden lg:flex items-center gap-10">
              {hardcodedMenu.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.url}
                    className={cn(
                      'relative navLink text-neutral-500 hover:text-black transition-colors py-2 border-b-2 border-transparent hover:border-black font-extrabold text-[10px] tracking-[0.2em]',
                      {
                        'text-black border-black':
                          item.url !== '/' ? pathname.includes(item.url) : pathname === '/',
                      },
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Icons Section */}
        <div className="flex items-center gap-1 md:gap-3 flex-none">
          {!isSearchOpen && (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-neutral-700 hover:text-black transition-colors p-2 group rounded-full hover:bg-neutral-50"
            >
              <Search className="w-[20px] h-[20px] transition-transform group-hover:scale-110" strokeWidth={2} />
            </button>
          )}
          <button className="hidden sm:block text-neutral-700 hover:text-black transition-colors p-2 group rounded-full hover:bg-neutral-50">
            <Heart className="w-[20px] h-[20px] transition-transform group-hover:scale-110" strokeWidth={2} />
          </button>
          <div className="relative">
            <Suspense fallback={<OpenCartButton />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </nav>
    </div>
  )
}
