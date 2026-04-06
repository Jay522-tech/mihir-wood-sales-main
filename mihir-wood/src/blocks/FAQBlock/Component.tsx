'use client'
import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/utilities/cn'

export const FAQBlockComponent: React.FC<any> = ({ title, description, questions }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="py-24 bg-white">
            <div className="container px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    {/* Left side: Heading */}
                    <div className="lg:col-span-4 space-y-4">
                        <h2 className="text-2xl font-medium tracking-tight uppercase text-gray-900 border-b border-[#D4BC9B] pb-8 w-max">
                            {title}
                        </h2>
                        {description && (
                            <p className="text-sm text-gray-600 pt-4 leading-relaxed">
                                {description}
                            </p>
                        )}
                    </div>

                    {/* Right side: Questions */}
                    <div className="lg:col-span-8 flex flex-col pt-4">
                        {Array.isArray(questions) && questions.map((item, index) => {
                            const isOpen = openIndex === index
                            return (
                                <div key={index} className="border-b border-gray-100 last:border-0 overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={() => toggle(index)}
                                        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                                    >
                                        <h3 className={cn(
                                            "text-sm font-medium transition-colors",
                                            isOpen ? "text-gray-900" : "text-gray-800 group-hover:text-black"
                                        )}>
                                            {item.question}
                                        </h3>
                                        <div className="flex-shrink-0 ml-4 text-gray-400 group-hover:text-black transition-colors">
                                            {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                        </div>
                                    </button>

                                    <div
                                        className={cn(
                                            "grid transition-all duration-300 ease-in-out",
                                            isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                                        )}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="text-sm text-gray-500 leading-relaxed pr-8">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
