import React from 'react'

const stats = [
    {
        value: '12k+',
        label: 'Projects',
    },
    {
        value: '15+',
        label: 'YRS Experience',
    },
    {
        value: '40+',
        label: 'Cities',
    },
    {
        value: '5',
        label: 'Years Warranty',
    },
]

export const TrustStats: React.FC = () => {
    return (
        <section className="bg-white py-16 md:py-20 border-t border-gray-100">
            <div className="container px-4">
                <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-12 md:mb-16 uppercase tracking-widest">
                    Trust Statistics
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            <span className="text-4xl md:text-5xl lg:text-6xl font-black text-[#D4BC9B] mb-3 tracking-tighter drop-shadow-sm transition-transform group-hover:scale-110">
                                {stat.value}
                            </span>
                            <span className="text-xs md:text-sm font-black text-gray-900 uppercase tracking-widest max-w-[120px]">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
