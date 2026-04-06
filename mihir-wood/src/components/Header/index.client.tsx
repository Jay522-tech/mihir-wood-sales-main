'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'

import type { Header } from 'src/payload-types'
import { MobileMenu } from './MobileMenu'
import type { CategoryWithChildren } from './index'

import { cn } from '@/utilities/cn'
import { createUrl } from '@/utilities/createUrl'
import { Search, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  header: Header
  categoryTree: CategoryWithChildren[]
}
export function HeaderClient({ header, categoryTree }: Props) {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  const router = useRouter()
  const menu = header.navItems || []
  const pathname = usePathname()
  const hardcodedMenu = [
    { label: 'Home', url: '/' },
    { label: 'Shop', url: '/shop' },
    { label: 'Custom', url: '/#custom' },
    { label: 'Bulk', url: '/bulk-orders' },
    { label: 'How It Works', url: '/about' },
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
      <nav className="container flex items-center justify-between py-1 min-h-[60px] uppercase tracking-widest text-[11px] font-bold">
        {/* Mobile menu toggle */}
        <div className={cn("flex items-center md:hidden", isSearchOpen && "hidden")}>
          <Suspense fallback={null}>
            <MobileMenu menu={menu} categoryTree={categoryTree} />
          </Suspense>
        </div>

        {/* Logo Section */}
        <div className={cn("flex items-center flex-none", isSearchOpen && "hidden md:flex")}>
          <Link href="/" className="flex items-center group overflow-visible">
            <Image
              src="/images/logo.png"
              alt="Mihir Wood"
              width={440}
              height={250}
              className={cn(
                "h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-[2.4] -my-6 origin-left transition-all duration-300",
                isSearchOpen ? "scale-[1.2] md:scale-[1.5]" : "scale-[2.2]"
              )}
              priority
            />
          </Link>
        </div>

        {/* Center Navigation / Search Bar */}
        <div className={cn("flex-1 flex justify-center transition-all duration-300", isSearchOpen ? "px-0 md:px-24 lg:px-32 mx-auto max-w-[1400px]" : "px-2 md:px-6 lg:px-12 max-w-3xl")}>
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
                  className="w-full bg-neutral-50 border border-[#D4BC9B] rounded-full px-8 py-2.5 md:py-3 text-[10px] md:text-[11px] font-black tracking-[0.25em] md:tracking-[0.3em] lg:tracking-[0.4em] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D4BC9B] transition-all shadow-sm"
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
            <ul className="hidden md:flex items-center gap-6 lg:gap-10 h-full">
              {hardcodedMenu.map((item) => (
                <li key={item.label} className={cn("flex items-center h-full", item.label === 'Shop' ? 'group/shop' : '')}>
                  <Link
                    href={item.url}
                    className={cn(
                      'relative navLink text-neutral-500 hover:text-black transition-colors py-2 border-b-2 border-transparent hover:border-black font-extrabold text-[10px] tracking-[0.2em]',
                      {
                        'text-black border-black':
                          item.url !== '/' ? pathname.includes(item.url) : pathname === '/',
                      },
                      item.label === 'Shop' ? 'group-hover/shop:text-black group-hover/shop:border-black z-50 py-4' : 'py-4'
                    )}
                  >
                    {item.label}
                  </Link>

                  {item.label === 'Shop' && (
                    <div className="absolute left-0 top-full w-full bg-white border-t border-gray-200 opacity-0 invisible group-hover/shop:opacity-100 group-hover/shop:visible transition-all duration-300 z-40 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] pt-8 pb-10 pointer-events-none group-hover/shop:pointer-events-auto">
                      <div className="container mx-auto px-4 md:px-12 flex flex-wrap lg:flex-nowrap gap-x-16 gap-y-8 justify-start max-w-[1400px]">
                        {categoryTree?.map((mainCategory) => (
                          <div key={mainCategory.id} className={cn("flex flex-col", mainCategory.children && mainCategory.children.length > 8 ? "flex-[2]" : "min-w-[280px] flex-1 max-w-[350px]")}>
                            <Link
                              href={`/shop?category=${mainCategory.id}`}
                              className="text-[13px] font-black tracking-[0.2em] uppercase mb-4 text-black hover:text-[#D4BC9B] transition-colors border-b border-neutral-100 pb-3 inline-block w-full"
                            >
                              {mainCategory.title}
                            </Link>
                            {mainCategory.children && mainCategory.children.length > 0 && (
                              <ul className={cn("gap-x-12", mainCategory.children.length > 8 ? "columns-1 md:columns-2 lg:columns-3" : "flex flex-col gap-3")}>
                                {mainCategory.children.map((subCategory: any) => (
                                  <li key={subCategory.id} className="break-inside-avoid mb-4">
                                    <Link
                                      href={`/shop?category=${subCategory.id}`}
                                      className={cn(
                                        "text-[11px] font-bold text-neutral-700 hover:text-black transition-colors inline-block uppercase tracking-wider",
                                        subCategory.children && subCategory.children.length > 0 ? "mb-2 text-black tracking-[0.15em]" : ""
                                      )}
                                    >
                                      {subCategory.title}
                                    </Link>
                                    {subCategory.children && subCategory.children.length > 0 && (
                                      <ul className="flex flex-col gap-2 mt-1">
                                        {subCategory.children.map((subSub: any) => (
                                          <li key={subSub.id}>
                                            <Link
                                              href={`/shop?category=${subSub.id}`}
                                              className="text-[10px] font-semibold text-neutral-500 hover:text-[#D4BC9B] transition-colors flex items-center uppercase tracking-wider group/link"
                                            >
                                              <span className="w-2 h-[1px] bg-neutral-300 mr-2 group-[.group\/link]:hover:bg-[#D4BC9B] transition-colors" />
                                              {subSub.title}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
        </div>
      </nav>
    </div>
  )
}
