'use client'

import { Media } from '@/components/Media'
import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Props = {
    images?: any[]
    video?: any
}

export const ReviewMedia: React.FC<Props> = ({ images, video }) => {
    const [selectedMedia, setSelectedMedia] = useState<{ type: 'image' | 'video'; resource: any } | null>(null)

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedMedia) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [selectedMedia])

    return (
        <>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images && Array.isArray(images) && images.map((image, index) => (
                    <div key={index} className="pt-2 flex-shrink-0">
                        <button
                            onClick={() => setSelectedMedia({ type: 'image', resource: image })}
                            className="relative aspect-square w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-neutral-100 bg-white group cursor-zoom-in"
                            title="Click to view full image"
                        >
                            <Media
                                resource={image}
                                fill
                                imgClassName="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
                                </div>
                            </div>
                        </button>
                    </div>
                ))}
                {video && typeof video === 'object' && (
                    <div className="pt-2 flex-shrink-0">
                        <div className="relative aspect-square w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-neutral-100 bg-black group">
                            <video
                                src={video.url || ''}
                                className="w-full h-full object-cover"
                                muted
                                loop
                                onMouseOver={(e) => e.currentTarget.play()}
                                onMouseOut={(e) => e.currentTarget.pause()}
                                onClick={() => setSelectedMedia({ type: 'video', resource: video })}
                                playsInline
                                controls={false}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none">
                                <div className="w-6 h-6 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent ml-0.5" />
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedMedia({ type: 'video', resource: video })}
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-sm p-1 rounded-md text-white hover:bg-black/70"
                                title="View video full screen"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedMedia && (
                <div
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300"
                    onClick={() => setSelectedMedia(null)}
                >
                    <div
                        className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedMedia(null)}
                            className="absolute -top-12 sm:-top-12 right-4 sm:right-0 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"
                        >
                            <X size={24} />
                        </button>

                        <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-none sm:rounded-xl bg-neutral-900/50">
                            {selectedMedia.type === 'image' ? (
                                <div className="relative w-full h-full min-h-[40vh] sm:min-h-[50vh] flex items-center justify-center p-2 sm:p-0">
                                    <img
                                        src={selectedMedia.resource.url}
                                        alt={selectedMedia.resource.alt || 'Full size view'}
                                        className="max-w-full max-h-[75vh] sm:max-h-[85vh] object-contain shadow-2xl animate-in zoom-in-95 duration-500"
                                    />
                                </div>
                            ) : (
                                <video
                                    src={selectedMedia.resource.url}
                                    className="max-w-full max-h-[75vh] sm:max-h-[85vh] shadow-2xl animate-in zoom-in-95 duration-500"
                                    controls
                                    autoPlay
                                    loop
                                />
                            )}
                        </div>

                        {selectedMedia.resource.alt && (
                            <div className="absolute -bottom-10 left-0 right-0 text-center">
                                <p className="text-white/60 text-sm font-light tracking-wide">{selectedMedia.resource.alt}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
