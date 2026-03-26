import type { Media as MediaType, Product } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Gallery } from '@/components/product/Gallery'
import { ProductDescription } from '@/components/product/ProductDescription'
import { ReviewSection } from '@/components/product/ReviewSection'
import { ProductGridItem } from '@/components/ProductGridItem'
import { RichText } from '@/components/RichText'
import { Breadcrumbs } from '@/components/Shop/Breadcrumbs'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import configPromise from '@payload-config'
import { CheckCircle2, ShieldCheck, Trophy } from 'lucide-react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { Suspense } from 'react'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const product = await queryProductBySlug({ slug })

  if (!product) return notFound()

  const gallery = product.gallery?.filter((item) => typeof item.image === 'object') || []

  const metaImage = typeof product.meta?.image === 'object' ? product.meta?.image : undefined
  const canIndex = product._status === 'published'

  const seoImage = metaImage || (gallery.length ? (gallery[0]?.image as MediaType) : undefined)

  return {
    description: product.meta?.description || '',
    openGraph: seoImage?.url
      ? {
        images: [
          {
            alt: seoImage?.alt,
            height: seoImage.height!,
            url: seoImage?.url,
            width: seoImage.width!,
          },
        ],
      }
      : undefined,
    robots: {
      follow: canIndex,
      googleBot: {
        follow: canIndex,
        index: canIndex,
      },
      index: canIndex,
    },
    title: product.meta?.title || product.title,
  }
}

export default async function ProductPage({ params }: Args) {
  const { slug } = await params
  const product = await queryProductBySlug({ slug })

  if (!product) return notFound()

  // Increment visit count
  const payload = await getPayload({ config: configPromise })
  await payload.update({
    collection: 'products',
    id: product.id,
    data: {
      visitCount: (product.visitCount || 0) + 1,
    },
  })

  let gallery =
    product.gallery
      ?.filter((item) => typeof item.image === 'object')
      .map((item) => ({
        ...item,
        image: item.image as MediaType,
      })) || []

  // Mocking multiple images for demonstration as requested by the user
  if (slug === 'dummy-product-5' && gallery.length === 1) {
    const mockImageNames = ['chair.jpg', 'bed.jpg', 'sofa.jpg', 'modern_chair_1774243729499.png']
    mockImageNames.forEach((name, i) => {
      gallery.push({
        id: `mock-${i}`,
        image: {
          id: `mock-img-${i}`,
          url: `/media/${name}`,
          alt: `Mock image ${i + 1}`,
          width: 800,
          height: 800,
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        } as any,
      })
    })
  }

  const metaImage = typeof product.meta?.image === 'object' ? product.meta?.image : undefined
  const hasStock = product.enableVariants
    ? product?.variants?.docs?.some((variant) => {
      if (typeof variant !== 'object') return false
      return variant.inventory && variant?.inventory > 0
    })
    : product.inventory! > 0

  let price = product.priceInINR

  if (product.enableVariants && product?.variants?.docs?.length) {
    price = product?.variants?.docs?.reduce((acc, variant) => {
      if (typeof variant === 'object' && variant?.priceInINR && acc && variant?.priceInINR > acc) {
        return variant.priceInINR
      }
      return acc
    }, price)
  }

  const productJsonLd = {
    name: product.title,
    '@context': 'https://schema.org',
    '@type': 'Product',
    description: product.meta?.description || product.title,
    image: metaImage?.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: hasStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      price: price,
      priceCurrency: 'inr',
    },
  }

  let relatedProducts =
    product.relatedProducts?.filter((relatedProduct) => typeof relatedProduct === 'object') ?? []

  if (relatedProducts.length === 0 && product.categories?.length) {
    const categoryIds = product.categories.map((cat) => (typeof cat === 'object' ? cat.id : cat))
    const relatedResult = await payload.find({
      collection: 'products',
      limit: 10,
      where: {
        and: [
          {
            id: {
              not_equals: product.id,
            },
          },
          {
            categories: {
              in: categoryIds,
            },
          },
        ],
      },
    })
    relatedProducts = relatedResult.docs
  }

  const reviewsResult = await payload.find({
    collection: 'reviews',
    depth: 2,
    where: {
      product: {
        equals: product.id,
      },
    },
    limit: 100,
  })

  let reviews: any[] = reviewsResult.docs

  if (reviews.length === 0) {
    reviews = [
      {
        id: 'dummy-1',
        customerName: 'Aarav Sharma',
        rating: 5,
        content: 'The craftsmanship of this Sheesham wood cabinet is absolutely breathtaking. It adds a touch of royal elegance to my living room. Highly recommended!',
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        images: [
          {
            url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070&auto=format&fit=crop',
            alt: 'Royal Living Room',
          },
          {
            url: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=2070&auto=format&fit=crop',
            alt: 'Wood Texture',
          }
        ] as any,
      },
      {
        id: 'dummy-2',
        customerName: 'Priya Patel',
        rating: 4,
        content: 'Beautiful design and very sturdy. The natural finish is exactly what I was looking for. The delivery was also very prompt and the packaging was excellent.',
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        images: [
          {
            url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop',
            alt: 'Modern Interior',
          }
        ] as any,
        video: {
          url: 'https://cdn.pixabay.com/video/2016/09/21/5301-183492582_large.mp4',
          alt: 'Product Video Preview',
        } as any,
      },
      {
        id: 'dummy-3',
        customerName: 'Vikram Singh',
        rating: 5,
        content: 'Exceeded my expectations! The intricate carvings are even more detailed in person. A true masterpiece from Mihir Wood Works.',
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        images: [
          {
            url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
            alt: 'Carving Detail',
          },
          {
            url: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=1965&auto=format&fit=crop',
            alt: 'Furniture Setup',
          }
        ] as any,
      },
      {
        id: 'dummy-4',
        customerName: 'Siddharth Jain',
        rating: 5,
        content: 'I am amazed by the quality. The wood is premium and the finish is flawless. It was well worth the wait. Highly recommended for anyone looking for authentic wood furniture.',
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        images: [
          {
            url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop',
            alt: 'Premium Furniture',
          }
        ] as any,
      },
      {
        id: 'dummy-5',
        customerName: 'Ananya Rao',
        rating: 4,
        content: 'The piece is lovely and exactly as described. One minor delay in shipping but the customer support was very helpful. Overall a great experience.',
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        images: [
          {
            url: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1964&auto=format&fit=crop',
            alt: 'Living Room Setup',
          }
        ] as any,
      },
      {
        id: 'dummy-6',
        customerName: 'Rohan Mehta',
        rating: 5,
        content: 'Top notch quality and service! Mihir Wood Works really understands the customer needs. The customisations I requested were executed perfectly.',
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        images: [
          {
            url: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=2070&auto=format&fit=crop',
            alt: 'Custom Woodwork',
          }
        ] as any,
      }
    ] as any
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
        type="application/ld+json"
      />

      {/* Breadcrumbs Section */}
      <div className="container py-4 md:py-8">
        <Breadcrumbs
          items={[
            { label: 'Collections', href: '/shop' },
            ...(product.categories?.map((category) => {
              if (typeof category === 'object' && category !== null) {
                return {
                  label: category.title,
                  href: `/shop?category=${category.id}`,
                }
              }
              return null
            }).filter(Boolean) as { label: string; href?: string }[] || []),
            { label: product.title || '' }
          ]}
        />
      </div>

      <main className="container pb-16 md:pb-24">
        {/* Main Product Section */}
        {/* Main Product Section - Using contents on mobile to allow reordering */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-start">
          {/* Left Column Group */}
          <div className="contents lg:block lg:space-y-12 md:lg:space-y-16">
            <div className="order-1 w-full space-y-8">
              <div className="space-y-8">
                <Suspense
                  fallback={
                    <div className="relative aspect-square w-full bg-neutral-100 animate-pulse rounded-lg" />
                  }
                >
                  {Boolean(gallery?.length) && <Gallery gallery={gallery} />}
                </Suspense>
              </div>
            </div>

            {/* Product Information */}
            <div className="order-4 w-full pt-4 md:pt-8 space-y-6 md:space-y-8">
              <h2 className="text-2xl md:text-3xl font-serif text-neutral-900 border-b border-neutral-100 pb-6 uppercase tracking-tight">Product Story</h2>
              <div className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed italic text-base md:text-lg">
                {product.description && <RichText data={product.description} enableGutter={false} />}
                <ul className="not-italic space-y-3 mt-6">
                  {['Solid Sheesham wood construction', 'Intricate hand-carved Haveli-inspired design', 'Two cabinet doors with spacious internal storage', 'Hand-polished with premium finishes', 'Ideal for adding luxurious, timeless elegance to your home.'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#D4BC9B] mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Product Materials */}
            <div className="order-5 w-full space-y-6 md:space-y-8">
              <h2 className="text-2xl md:text-3xl font-serif text-neutral-900 border-b border-neutral-100 pb-6 uppercase tracking-tight">Exquisite Materials</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {[
                  { title: 'Solid Sheesham Wood', icon: Trophy, desc: 'Premium Hardwood' },
                  { title: 'Natural Finishes', icon: CheckCircle2, desc: 'Eco-polished' },
                  { title: 'Premium Photos', icon: ShieldCheck, desc: 'Exact product' }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl border border-neutral-100 flex flex-col items-center text-center gap-3">
                    <div className="text-[#D4BC9B]">
                      <item.icon size={24} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-sm text-neutral-900">{item.title}</h3>
                      <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="order-6 w-full space-y-6">
              <h2 className="text-xl md:text-2xl font-serif text-neutral-900 border-b border-neutral-200 pb-4">Terms & Conditions</h2>
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
                {[
                  { value: '2.2k+', label: 'Projects' },
                  { value: '15+', label: 'Years' },
                  { value: '40+', label: 'Cities' },
                  { value: product.warranty || '5', label: 'Warranty' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-4 md:p-6 rounded-xl border border-neutral-100 flex flex-col items-center text-center gap-1">
                    <span className="text-xl md:text-2xl font-serif text-[#D4BC9B]">{stat.value}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Customers Trust Us Form Placeholder */}
            <div className="order-7 w-full bg-neutral-50 rounded-2xl p-8 space-y-6 border border-neutral-100">
              <div className="text-center md:text-left space-y-2">
                <h2 className="text-2xl font-serif text-neutral-900">Why Customers Trust Us</h2>
                <p className="text-sm text-neutral-500 italic">Got questions? We're here to help.</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <input type="text" placeholder="Your Name" className="w-full h-12 px-6 rounded-full border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-1 ring-[#D4BC9B]" />
                <Button className="w-full h-12 bg-[#D4BC9B] text-white rounded-full font-black uppercase tracking-widest hover:bg-black transition-colors">Submit Request</Button>
              </div>
            </div>
          </div>

          {/* Right Column Group */}
          <div className="contents lg:block lg:space-y-12">
            <div className="order-2 w-full">
              <ProductDescription product={product} />
            </div>

            {/* Product Specifications Box */}
            <div className="order-3 w-full bg-[#FEF9F3] border border-[#F3E6D5] rounded-xl p-8 space-y-6">
              <h2 className="text-2xl font-serif text-neutral-900">Product Specifications</h2>
              <div className="space-y-4">
                {[
                  { label: 'Dimensions', value: "40' L x 18' D x 36' H" },
                  { label: 'Cabinet Size', value: 'Spacious double-door cabinet' },
                  { label: 'Wood', value: 'Sheesham (Rosewood)' },
                  { label: 'Finish Options', value: 'Walnut, Honey, Natural' },
                  { label: 'Weight', value: '50 kg' },
                  { label: 'Origin', value: 'Made in India' },
                  { label: 'Warranty', value: product.warranty ? `${product.warranty} Warranty` : '5 Years Warranty' }
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-neutral-500">{spec.label}:</span>
                    <span className="font-medium text-neutral-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="order-8 w-full space-y-12">
              <ReviewSection reviews={reviews || []} productId={product.id} />
            </div>
          </div>
        </div>

        {/* RenderBlocks for custom layout */}
        {product.layout?.length ? <RenderBlocks blocks={product.layout as any} /> : null}

        {/* Related Products */}
        {relatedProducts.length ? (
          <RelatedProducts products={relatedProducts as Product[]} />
        ) : null}
      </main>
    </div>
  )
}

function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null

  return (
    <div className="space-y-8 md:space-y-12 mt-16 md:mt-24 pt-16 md:pt-24 border-t border-neutral-100">
      <div className="space-y-2 text-center md:text-left px-4">
        <h2 className="text-lg md:text-2xl font-black text-gray-900 uppercase tracking-[0.2em] md:tracking-[0.3em]">Related Masterpieces</h2>
        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Curated complements for your collection</p>
      </div>
      <div className="relative px-4 sm:px-12 md:px-0">
        <Carousel
          opts={{
            align: 'start',
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-4 md:pl-6 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <ProductGridItem product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12 bg-white/90 hover:bg-white text-neutral-900 border-neutral-200 shadow-sm" />
            <CarouselNext className="-right-12 bg-white/90 hover:bg-white text-neutral-900 border-neutral-200 shadow-sm" />
          </div>
        </Carousel>
      </div>
    </div>
  )
}

const queryProductBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  return products.docs.map(({ slug }) => {
    return { slug }
  })
}
