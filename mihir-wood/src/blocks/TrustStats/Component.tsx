import React from 'react'

export const TrustStats: React.FC<any> = (props) => {
    const { stats } = props

    if (!stats || stats.length === 0) return null

    return (
        <section className="bg-white py-16 md:py-24 border-y border-gray-100">
            <div className="container px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat: any, i: number) => {
                        return (
                            <div key={i} className="flex flex-col items-center text-center">
                                <div className="space-y-1">
                                    <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter italic">
                                        {stat.value}
                                    </h3>
                                    <p className="text-[10px] md:text-[11px] font-black text-[#D4BC9B] uppercase tracking-[0.4em] italic">
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
