import { SidebarFilters } from '@/components/layout/search/filter/SidebarFilters'
import { HeroBanner } from '@/components/Shop/HeroBanner'
import React, { Suspense } from 'react'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <div className="bg-[#F9F7F2] min-h-screen">
        {/* Hero Section */}
        <HeroBanner
          title="Haveli Collection"
          subtitle="Curated Luxury Furniture"
          backgroundImage="/api/media/file/wooden_armchair_rustic_1774243797674.png"
        />

        <div className="container flex flex-col gap-8 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 lg:gap-20 mt-4">
            <aside className="w-full md:w-52 lg:w-64 flex-none hidden md:block sticky top-24">
              <SidebarFilters />
            </aside>
            <main className="flex-1 w-full">{children}</main>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
