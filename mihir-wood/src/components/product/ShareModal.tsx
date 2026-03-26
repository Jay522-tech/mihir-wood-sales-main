'use client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/utilities/cn'
import { Copy } from 'lucide-react'
import React from 'react'

type Props = {
    isOpen: boolean
    onClose: () => void
    product: {
        title: string
        description?: string | any
        url: string
    }
}

export const ShareModal: React.FC<Props> = ({ isOpen, onClose, product }) => {
    const productUrl = typeof window !== 'undefined' ? window.location.origin + product.url : product.url

    const textDescription = typeof product.description === 'string'
        ? product.description
        : (product.description?.root?.children?.[0]?.children?.[0]?.text || '')

    const shareLinks = [
        {
            name: 'Facebook',
            icon: (
                <svg viewBox="0 0 24 24" className="size-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
            brandColor: 'bg-[#1877F2] hover:bg-[#1877F2]/90 text-white'
        },
        {
            name: 'Instagram',
            icon: (
                <svg viewBox="0 0 24 24" className="size-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.607 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.607-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4.162 4.162 0 110-8.324 4.162 4.162 0 010 8.324zM18.406 4.137a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
                </svg>
            ),
            href: 'https://www.instagram.com/',
            brandColor: 'bg-[#E4405F] hover:bg-[#E4405F]/90 text-white'
        },
        {
            name: 'WhatsApp',
            icon: (
                <svg viewBox="0 0 24 24" className="size-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${product.title} - ${productUrl}`)}`,
            brandColor: 'bg-[#25D366] hover:bg-[#25D366]/90 text-white'
        },
        {
            name: 'Twitter',
            icon: (
                <svg viewBox="0 0 24 24" className="size-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" />
                </svg>
            ),
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(product.title)}&url=${encodeURIComponent(productUrl)}`,
            brandColor: 'bg-black hover:bg-neutral-800 text-white'
        },
        {
            name: 'Telegram',
            icon: (
                <svg viewBox="0 0 24 24" className="size-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.944 0C5.346 0 0 5.346 0 11.944c0 6.598 5.346 11.944 11.944 11.944s11.944-5.346 11.944-11.944C23.888 5.346 18.542 0 11.944 0zm5.807 8.271l-1.99 9.382c-.15.666-.543.832-.898.632l-3.033-2.235-1.463 1.408c-.161.161-.297.297-.61.297l.217-3.085 5.618-5.074c.244-.216-.053-.338-.377-.122l-6.944 4.371L5.34 13.04c-.643-.201-.655-.643.134-.951l7.85-3.023c.365-.134.68-.041.874.32l2.677 7.02c.164.43.08.761-.23.896l-.004.004z" />
                </svg>
            ),
            href: `https://t.me/share/url?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(product.title)}`,
            brandColor: 'bg-[#0088CC] hover:bg-[#0088CC]/90 text-white'
        },
        {
            name: 'Copy Link',
            icon: <Copy className="size-5" />,
            onClick: async () => {
                try {
                    await navigator.clipboard.writeText(productUrl)
                    alert('Link copied to clipboard!')
                } catch (err) {
                    console.error('Could not copy text: ', err)
                }
            },
            brandColor: 'bg-neutral-600 hover:bg-neutral-700 text-white'
        },
    ]

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-[#FDFBF7] border-[#F3E6D5] text-neutral-900 p-0 overflow-hidden shadow-2xl">
                <div className="p-8 space-y-8">
                    <DialogHeader className="flex flex-row items-center justify-between space-y-0">
                        <DialogTitle className="text-2xl font-serif text-neutral-900 leading-none">Share this product</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="font-serif text-lg text-neutral-900 leading-tight">{product.title}</h3>
                            <p className="text-sm text-neutral-600 leading-relaxed italic line-clamp-2">
                                {textDescription}
                            </p>
                        </div>

                        <div className="bg-[#FEF9F3] rounded-xl p-4 border border-[#F3E6D5]">
                            <p className="text-xs text-[#000000] truncate font-medium tracking-wide">
                                {productUrl}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-6 gap-4">
                        {shareLinks.map((link) => (
                            <div key={link.name} className="flex flex-col items-center gap-2">
                                {link.href ? (
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            "flex items-center justify-center size-10 rounded-full transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md border border-white/10",
                                            (link as any).brandColor
                                        )}
                                        title={link.name}
                                    >
                                        {link.icon}
                                    </a>
                                ) : (
                                    <button
                                        onClick={(link as any).onClick}
                                        className={cn(
                                            "flex items-center justify-center size-10 rounded-full transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md border border-white/10",
                                            (link as any).brandColor
                                        )}
                                        title={link.name}
                                    >
                                        {link.icon}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            className="w-full bg-neutral-900 border-transparent hover:bg-[#D4BC9B] text-[#D4BC9B] hover:text-black h-12 rounded-full font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            Close
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}
