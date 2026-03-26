import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube, Search, Heart, ShoppingCart } from 'lucide-react'

const footerLinks = {
  Collections: ['Collection', 'Dining Ceiling', 'Projecties', 'About'],
  Legal: ['Contact', 'Data', 'Garrett', 'Support'],
}

const socialIcons = [
  { icon: Facebook, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Youtube, href: '#' },
]

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F5F2EA] pt-16 md:pt-24 pb-12 border-t border-gray-100">
      <div className="container px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-[#5D4037] uppercase tracking-tighter italic">
              Mihir Wood
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-bold leading-relaxed max-w-[280px]">
              Premium teak wood furniture brand for modern homes.
            </p>
            <div className="flex gap-4">
              {socialIcons.map((social, idx) => (
                <Link key={idx} href={social.href} className="text-gray-900 hover:text-[#D4BC9B] transition-colors">
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-6">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
                        {link}
                      </Link>
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
              <p className="text-sm font-black text-gray-900 tracking-wide uppercase">
                info:+91-152 25 300
              </p>
              <p className="text-sm font-bold text-gray-600 lowercase transition-colors hover:text-gray-900">
                www.mihirwood.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Payment Icons & Copyright */}
        <div className="pt-12 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap justify-center gap-4 grayscale opacity-70">
            {['Amex', 'Mastercard', 'Visa', 'PayPal', 'Gpay', 'ApplePay'].map((method) => (
              <span key={method} className="px-3 py-1 bg-white border border-gray-100 rounded-md text-[10px] font-black uppercase tracking-widest text-gray-400">
                {method}
              </span>
            ))}
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-center md:text-end">
            © 2026 Mihir Wood Sales. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
