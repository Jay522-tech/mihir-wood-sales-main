'use client'
import { Award, Check, Clock, Home, Users } from 'lucide-react'
import React from 'react'

const iconMap = {
    users: Users,
    home: Home,
    award: Award,
    clock: Clock,
    check: Check,
}

export const TrustStats: React.FC<any> = (props) => {
    const { stats } = props

    if (!stats || stats.length === 0) return null

    return (
        <section className="bg-white py-16 md:py-24 border-y border-gray-100">
            <div className="container px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat: any, i: number) => {
                        const IconComponent = stat.icon ? iconMap[stat.icon as keyof typeof iconMap] : null

                        return (
                            <div key={i} className="flex flex-col items-center text-center space-y-4 group">
                                <div className="p-4 bg-[#F9F7F2] rounded-2xl text-[#D4BC9B] group-hover:bg-[#D4BC9B] group-hover:text-white transition-all duration-500 shadow-sm">
                                    {IconComponent && <IconComponent size={32} />}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter italic">
                                        {stat.value}
                                    </h3>
                                    <p className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest italic">
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
