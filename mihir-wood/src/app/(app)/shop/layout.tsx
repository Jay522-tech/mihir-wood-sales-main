import React, { Suspense } from 'react'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <div className="bg-[#F9F7F2] min-h-screen">
        {children}
      </div>
    </Suspense>
  )
}
