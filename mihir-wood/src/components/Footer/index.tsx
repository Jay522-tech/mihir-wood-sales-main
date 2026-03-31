import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube, Search, Heart, ShoppingCart, LucideIcon } from 'lucide-react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CMSLink } from '@/components/Link'

const iconMap: Record<string, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
}

export const Footer: React.FC = async () => {
  const payload = await getPayload({ config: configPromise })
  const footer = await payload.findGlobal({
    slug: 'footer',
  })

  const {
    logoText = 'Mihir Wood',
    tagline = 'Premium teak wood furniture brand for modern homes.',
    socialLinks = [],
    linkGroups = [],
    contactInfo = { phone: '+91-152 25 300', website: 'www.mihirwood.com' },
    copyrightText = `© ${new Date().getFullYear()} Mihir Wood Sales. All rights reserved.`
  } = footer

  return (
    <footer className="bg-[#F5F2EA] pt-16 md:pt-24 pb-12 border-t border-gray-100">
      <div className="container px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-[#5D4037] uppercase tracking-tighter italic">
              {logoText}
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-bold leading-relaxed max-w-[280px]">
              {tagline}
            </p>
            <div className="flex gap-4">
              {socialLinks?.map((social, idx) => {
                const Icon = social.icon ? iconMap[social.icon] : null
                if (!Icon) return null
                return (
                  <Link key={idx} href={social.url || '#'} className="text-gray-900 hover:text-[#D4BC9B] transition-colors">
                    <Icon className="w-5 h-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            {linkGroups?.map((group, idx) => (
              <div key={idx} className="space-y-6">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">{group.title}</h3>
                <ul className="space-y-4">
                  {group.links?.map((linkItem, lIdx) => (
                    <li key={lIdx}>
                      <CMSLink
                        {...linkItem.link}
                        className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact & Utility Info */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-8">
            <div className="flex gap-6 text-gray-900">
              <Search className="w-5 h-5 cursor-pointer hover:text-[#D4BC9B] transition-colors" />
              <Heart className="w-5 h-5 cursor-pointer hover:text-[#D4BC9B] transition-colors" />
              <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-[#D4BC9B] transition-colors" />
            </div>
            <div className="space-y-2 text-start lg:text-end">
              {contactInfo?.phone && (
                <p className="text-sm font-black text-gray-900 tracking-wide uppercase">
                  info:{contactInfo.phone}
                </p>
              )}
              {contactInfo?.website && (
                <p className="text-sm font-bold text-gray-600 lowercase transition-colors hover:text-gray-900">
                  {contactInfo.website}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright Only */}
        <div className="pt-12 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-center md:text-start">
            {copyrightText}
          </p>
          <div className="flex gap-6">
            <Link
              href="/terms-and-conditions"
              className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] hover:text-[#D4BC9B] transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy-policy"
              className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] hover:text-[#D4BC9B] transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
