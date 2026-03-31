import { Grid } from '@/components/Grid'
import { SidebarFilters } from '@/components/layout/search/filter/SidebarFilters'
import { ProductGridItem } from '@/components/ProductGridItem'
import { Breadcrumbs } from '@/components/Shop/Breadcrumbs'
import { MobileFilters } from '@/components/Shop/MobileFilters'
import { HeroBanner } from '@/components/Shop/HeroBanner'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { createUrl } from '@/utilities/createUrl'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Media } from '@/payload-types'

export const metadata = {
  description: 'Search for products in the store.',
  title: 'Shop',
}

type SearchParams = { [key: string]: string | string[] | undefined }

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function ShopPage({ searchParams }: Props) {
  const { q: searchValue, sort, category, page } = await searchParams
  const currentPage = typeof page === 'string' ? parseInt(page) : 1
  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    draft: false,
    overrideAccess: false,
    limit: 12,
    page: currentPage,
    select: {
      title: true,
      slug: true,
      gallery: true,
      categories: true,
      priceInINR: true,
    },
    ...(sort ? { sort } : { sort: 'title' }),
    ...(searchValue || category
      ? {
        where: {
          and: [
            {
              _status: {
                equals: 'published',
              },
            },
            ...(searchValue
              ? [
                {
                  or: [
                    {
                      title: {
                        like: searchValue,
                      },
                    },
                    {
                      description: {
                        like: searchValue,
                      },
                    },
                  ],
                },
              ]
              : []),
            ...(category
              ? [
                {
                  categories: {
                    contains: category,
                  },
                },
              ]
              : []),
          ],
        },
      }
      : {}),
  })

  const { totalDocs, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = products
  const resultsText = products.docs.length > 1 ? 'results' : 'result'

  const createPaginationUrl = (pageNumber: number | null | undefined) => {
    if (!pageNumber) return '#'
    const params = new URLSearchParams()
    if (searchValue && typeof searchValue === 'string') params.set('q', searchValue)
    if (sort && typeof sort === 'string') params.set('sort', sort)
    if (category && typeof category === 'string') params.set('category', category)
    params.set('page', pageNumber.toString())
    return createUrl('/shop', params)
  }

  let categoryObject = null
  if (category && typeof category === 'string') {
    categoryObject = await payload.findByID({
      collection: 'categories',
      id: category,
      select: {
        title: true,
        subtitle: true,
        image: true,
      }
    })
  }

  const shopGlobal = await payload.findGlobal({
    slug: 'shop',
  })

  const bannerTitle = categoryObject?.title || shopGlobal?.banner?.title || 'Mihir Collection'
  const bannerSubtitle = categoryObject?.subtitle || shopGlobal?.banner?.subtitle || 'Curated Luxury Furniture'
  const bannerImage = (categoryObject?.image as Media)?.url || (shopGlobal?.banner?.image as Media)?.url || '/api/media/file/wooden_armchair_rustic_1774243797674.png'

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroBanner
        title={bannerTitle}
        subtitle={bannerSubtitle}
        backgroundImage={bannerImage}
      />

      <div className="container flex flex-col gap-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 lg:gap-20 mt-4">
          <aside className="w-full md:w-52 lg:w-64 flex-none hidden md:block sticky top-24">
            <SidebarFilters />
          </aside>

          <main className="flex-1 w-full space-y-8">
            <Breadcrumbs
              items={[
                { label: 'Collections', href: '/shop' },
                ...(categoryObject ? [{ label: categoryObject.title }] : []),
              ]}
            />
            {/* Header with Search Info and Filter Button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {searchValue ? (
                <p className="text-[10px] md:text-xs font-black text-gray-900 uppercase tracking-[0.2em]">
                  {products.docs?.length === 0
                    ? 'No products found for '
                    : `Showing ${products.docs.length} ${resultsText} for `}
                  <span className="text-[#D4BC9B] italic">&quot;{searchValue}&quot;</span>
                </p>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <MobileFilters totalDocs={totalDocs}>
                    <SidebarFilters />
                  </MobileFilters>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest hidden md:block">
                    {totalDocs} Products Available
                  </p>
                </div>
              )}
            </div>

            {/* Empty State */}
            {!searchValue && products.docs?.length === 0 && (
              <div className="py-20 text-center space-y-4">
                <p className="text-xl font-bold text-gray-900">No products found.</p>
                <p className="text-gray-500">Please try different filters or search terms.</p>
              </div>
            )}

            {/* Product Grid */}
            {products?.docs.length > 0 ? (
              <Grid className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-10">
                {products.docs.map((product) => (
                  <ProductGridItem key={product.id} product={product} />
                ))}
              </Grid>
            ) : null}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pt-8">
                <Pagination>
                  <PaginationContent>
                    {hasPrevPage && (
                      <PaginationItem>
                        <PaginationPrevious href={createPaginationUrl(prevPage)} />
                      </PaginationItem>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href={createPaginationUrl(pageNumber)}
                          isActive={pageNumber === currentPage}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    {hasNextPage && (
                      <PaginationItem>
                        <PaginationNext href={createPaginationUrl(nextPage)} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
