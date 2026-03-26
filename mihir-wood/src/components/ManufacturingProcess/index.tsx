import React from 'react'
import { SearchCheck, Wrench, BadgeCheck, PackageCheck, ArrowRight } from 'lucide-react'

const steps = [
    {
        Icon: SearchCheck,
        title: 'Selection',
    },
    {
        Icon: Wrench,
        title: 'Crafting',
    },
    {
        Icon: BadgeCheck,
        title: 'Quality Check',
    },
    {
        Icon: PackageCheck,
        title: 'Delivery & Installation',
    },
]

export const ManufacturingProcess: React.FC = () => {
    return (
        <section className="bg-[#FAF9F6] py-10 md:py-14">
            <div className="container px-4">
                <div className="max-w-4xl mx-auto text-center mb-8 md:mb-10">
                    <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-[0.3em]">
                        Manufacturing Process
                    </h2>
                    <div className="w-12 h-1 bg-[#D4BC9B] mx-auto mt-4" />
                </div>

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
                    {steps.map((step, idx) => (
                        <React.Fragment key={idx}>
                            <div className="flex flex-col items-center text-center group flex-1">
                                <div className="mb-4 text-[#D4BC9B] transition-all group-hover:scale-110 duration-300">
                                    <step.Icon size={48} strokeWidth={1.2} />
                                </div>
                                <h3 className="text-sm md:text-base font-black text-gray-900 uppercase tracking-widest leading-tight">
                                    {step.title}
                                </h3>
                            </div>

                            {idx < steps.length - 1 && (
                                <div className="hidden md:block self-center mb-6">
                                    <ArrowRight className="w-6 h-6 text-gray-300 stroke-[1.5]" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    )
}
