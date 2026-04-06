import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { PhoneCall } from 'lucide-react'
import { InquiryModal } from '@/components/InquiryModal'

export const HowItWorksComponent: React.FC<any> = ({ title, subtitle, steps, contactText }) => {
    return (
        <section className="py-24 bg-white">
            <div className="container px-4">
                <div className="text-center mb-16 space-y-2">
                    <h2 className="text-3xl text-gray-900 font-medium">{title}</h2>
                    <p className="text-gray-600 text-sm">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {Array.isArray(steps) && steps.map((step, index) => {
                        const img = typeof step.image === 'object' ? (step.image as Media) : null
                        const stepNum = (index + 1).toString().padStart(2, '0')

                        return (
                            <div key={index} className="flex flex-col relative group">
                                {img?.url && (
                                    <div className="relative aspect-[3/2] w-full rounded-2xl overflow-hidden shadow-sm">
                                        <Image
                                            src={img.url}
                                            alt={img.alt || step.title}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                        />
                                    </div>
                                )}

                                {/* White overlapping box with number */}
                                <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] px-6 pt-6 pb-8 md:px-8 w-[90%] mx-auto -mt-12 relative z-10 text-center flex flex-col items-center flex-grow">
                                    <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-gray-900 absolute -top-6 shadow-sm border border-gray-100">
                                        {stepNum}
                                    </div>
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">{step.title}</h3>

                                    {/* Subtle dashed arrow to the right of the box if not last item, hidden on mobile */}
                                    {index < steps.length - 1 && (
                                        <div className="hidden md:block absolute -right-[12%] top-16 w-[15%] border-t-[1.5px] border-dashed border-[#D4BC9B]/60" />
                                    )}

                                    <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {contactText && (
                    <div className="mt-16 text-center">
                        <span className="text-gray-900 font-medium text-lg block sm:inline-block">
                            {contactText}
                        </span>
                    </div>
                )}
            </div>
        </section>
    )
}
