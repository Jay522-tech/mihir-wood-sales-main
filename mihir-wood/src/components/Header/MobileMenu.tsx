'use client'

import type { Header } from '@/payload-types'
import type { CategoryWithChildren } from './index'

import { CMSLink } from '@/components/Link'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useAuth } from '@/providers/Auth'
import { MenuIcon, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { cn } from '@/utilities/cn'

interface Props {
  menu: Header['navItems']
  categoryTree: CategoryWithChildren[]
}

export function MobileMenu({ menu, categoryTree }: Props) {
  const { user } = useAuth()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [isShopExpanded, setIsShopExpanded] = useState(false)

  const closeMobileMenu = () => {
    setIsOpen(false)
    setIsShopExpanded(false)
    setExpandedCategories([])
  }

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, searchParams])

  const hardcodedMenu = [
    { label: 'Home', url: '/' },
    { label: 'Shop', url: '/shop', hasChildren: true },
    { label: 'Custom', url: '/#custom' },
    { label: 'Bulk', url: '/bulk-orders' },
    { label: 'About', url: '/about' },
  ]

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger className="relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-black transition-all hover:bg-neutral-50 active:scale-95">
        <MenuIcon className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent side="left" className="w-[300px] sm:w-[380px] p-0 border-r-0 bg-white text-black overflow-y-auto z-[100]">
        <div className="flex flex-col h-full">
          <div className="p-8 pb-4 overflow-visible">
            <Link href="/" onClick={closeMobileMenu} className="inline-block overflow-visible">
              <Image
                src="/images/logo.png"
                alt="Mihir Wood"
                width={440}
                height={250}
                className="h-12 w-auto object-contain scale-[2.2] origin-left"
              />
            </Link>
          </div>

          <div className="flex-1 px-8 py-6">
            {/* Main Navigation */}
            <nav className="mb-12">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-black mb-8">Navigation</h3>
              <ul className="flex flex-col gap-4">
                {hardcodedMenu.map((item) => (
                  <li key={item.label} className="group">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.url}
                        onClick={item.label === 'Shop' ? (e) => {
                          // If it's Shop, we might want to toggle instead of navigate on the arrow
                        } : closeMobileMenu}
                        className={cn(
                          "text-xl font-serif tracking-wide transition-colors hover:text-[#D4BC9B] flex items-center flex-1 py-1",
                          {
                            "text-[#D4BC9B]":
                              item.url !== '/' ? pathname.includes(item.url) : pathname === '/',
                            "text-neutral-900":
                              item.url !== '/' ? !pathname.includes(item.url) : pathname !== '/',
                          }
                        )}
                      >
                        {item.label}
                      </Link>

                      {item.label === 'Shop' && (
                        <button
                          onClick={() => setIsShopExpanded(!isShopExpanded)}
                          className="p-2 -mr-2 hover:bg-neutral-50 rounded-full transition-all"
                        >
                          <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", isShopExpanded ? "rotate-180 text-[#D4BC9B]" : "text-neutral-400")} />
                        </button>
                      )}
                    </div>

                    {/* Shop Categories Accordion */}
                    {item.label === 'Shop' && isShopExpanded && (
                      <div className="mt-4 ml-2 pl-4 border-l border-neutral-100 flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                        {categoryTree?.map((mainCategory) => (
                          <div key={mainCategory.id} className="flex flex-col gap-3">
                            <div className="flex items-center justify-between group/cat">
                              <Link
                                href={`/shop?category=${mainCategory.id}`}
                                onClick={closeMobileMenu}
                                className="text-[13px] font-black tracking-[0.1em] uppercase text-neutral-800 hover:text-[#D4BC9B] transition-colors"
                              >
                                {mainCategory.title}
                              </Link>

                              {mainCategory.children && mainCategory.children.length > 0 && (
                                <button
                                  onClick={() => toggleCategory(mainCategory.id)}
                                  className="p-1 hover:bg-neutral-50 rounded transition-all"
                                >
                                  <ChevronDown className={cn("w-4 h-4 transition-transform", expandedCategories.includes(mainCategory.id) ? "rotate-180 text-[#D4BC9B]" : "text-neutral-400")} />
                                </button>
                              )}
                            </div>

                            {/* Sub categories */}
                            {mainCategory.children && mainCategory.children.length > 0 && expandedCategories.includes(mainCategory.id) && (
                              <ul className="flex flex-col gap-3 pl-2 animate-in fade-in slide-in-from-top-1">
                                {mainCategory.children.map((subCategory: any) => (
                                  <li key={subCategory.id}>
                                    <Link
                                      href={`/shop?category=${subCategory.id}`}
                                      onClick={closeMobileMenu}
                                      className="text-[11px] font-bold text-neutral-500 hover:text-black transition-colors uppercase tracking-wider block"
                                    >
                                      {subCategory.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* CMS Settings Links (if any) */}
            {menu?.length ? (
              <div className="mb-12 pt-8 border-t border-neutral-50">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-black mb-6">Explore</h3>
                <ul className="flex flex-col gap-4">
                  {menu.map((item) => (
                    <li key={item.id}>
                      <CMSLink
                        {...item.link}
                        className="text-sm font-medium text-neutral-600 hover:text-black transition-colors"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
