import { Phone, MapPin, Clock } from 'lucide-react'
import React from 'react'

export type ContactInfoGridProps = {
    items?: {
        icon: 'phone' | 'map-pin' | 'clock'
        label: string
        content: string
    }[]
}

const icons = {
    phone: Phone,
    'map-pin': MapPin,
    clock: Clock,
}

export const ContactInfoGrid: React.FC<ContactInfoGridProps> = ({ items }) => {
    return (
        <section className="bg-[#FAF9F6] py-16 md:py-24 border-y border-neutral-50 overflow-hidden">
            <div className="container px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {items?.map((item, index) => {
                            const Icon = icons[item.icon]
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-neutral-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group"
                                >
                                    <div className="w-16 h-16 bg-[#D4BC9B]/5 rounded-2xl flex items-center justify-center mb-8 text-[#D4BC9B] group-hover:bg-[#D4BC9B] group-hover:text-white transition-colors duration-500">
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <span className="text-[#D4BC9B] font-black uppercase tracking-[0.3em] text-[10px] mb-3 block">
                                        {item.label}
                                    </span>
                                    <h3 className={`text-xl md:text-2xl font-serif text-neutral-900 ${item.icon === 'phone' ? 'italic' : ''}`}>
                                        {item.content.split('\n').map((line, i) => (
                                            <React.Fragment key={i}>
                                                {line}
                                                {i < item.content.split('\n').length - 1 && <br />}
                                            </React.Fragment>
                                        ))}
                                    </h3>
                                    <div className="w-12 h-px bg-[#D4BC9B] mt-6 opacity-30 group-hover:w-20 transition-all duration-500" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
