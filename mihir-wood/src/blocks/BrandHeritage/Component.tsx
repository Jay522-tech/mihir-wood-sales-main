import React from 'react'

export type BrandHeritageProps = {
    title?: string
    subtitle?: string
    chapters?: {
        title: string
        content: string
    }[]
}

export const BrandHeritage: React.FC<BrandHeritageProps> = ({ title, subtitle, chapters }) => {
    return (
        <section className="bg-white py-20 border-b border-neutral-50 overflow-hidden">
            <div className="container px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        {/* Left: Sticky Header */}
                        <div className="lg:col-span-4 lg:sticky lg:top-32">
                            {subtitle && (
                                <span className="text-[#D4BC9B] font-black uppercase tracking-[0.3em] text-xs mb-4 block">
                                    {subtitle}
                                </span>
                            )}
                            <h2 className="text-4xl md:text-5xl font-serif text-neutral-900 leading-tight italic">
                                {title?.split('<br />').map((text, i) => (
                                    <React.Fragment key={i}>
                                        {text}
                                        {i === 0 && <br />}
                                    </React.Fragment>
                                )) || title}
                            </h2>
                            <div className="w-16 h-px bg-[#D4BC9B] mt-8 opacity-40" />
                        </div>

                        {/* Right: Narrative Content */}
                        <div className="lg:col-span-8 space-y-16">
                            {chapters?.map((chapter, index) => (
                                <div
                                    key={index}
                                    className={`space-y-6 ${index === 0 ? 'animate-in fade-in slide-in-from-bottom-4 duration-1000' : ''}`}
                                >
                                    <h3 className="text-xl font-serif text-neutral-900 italic border-b border-neutral-100 pb-2 inline-block">
                                        {chapter.title}
                                    </h3>
                                    <p className={`text-lg text-neutral-600 leading-relaxed font-light ${index === 0 ? 'first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-[#D4BC9B]' : ''}`}>
                                        {chapter.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
