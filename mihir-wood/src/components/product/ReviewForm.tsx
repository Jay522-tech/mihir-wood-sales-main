'use client'

import { submitReviewAction } from '@/app/(app)/products/actions'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle2, Loader2, Star, Upload, X } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    productId: string
    onClose: () => void
    onSuccess?: () => void
}

export const ReviewForm: React.FC<Props> = ({ productId, onClose, onSuccess }) => {
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [customerName, setCustomerName] = useState('')
    const [content, setContent] = useState('')
    const [selectedFiles, setSelectedFiles] = useState<{ file: File; preview: string; type: 'image' | 'video' }[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        const newSelectedFiles = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            type: file.type.startsWith('video/') ? 'video' as const : 'image' as const
        }))
        setSelectedFiles(prev => [...prev, ...newSelectedFiles].slice(0, 5)) // Max 5 files
    }

    const removeFile = (index: number) => {
        setSelectedFiles(prev => {
            const newFiles = [...prev]
            URL.revokeObjectURL(newFiles[index].preview)
            newFiles.splice(index, 1)
            return newFiles
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (rating === 0) {
            setErrorMessage('Please select a rating')
            return
        }

        setIsSubmitting(true)
        setErrorMessage('')

        try {
            const formData = new FormData()
            formData.append('productId', productId)
            formData.append('rating', rating.toString())
            formData.append('customerName', customerName)
            formData.append('content', content)

            selectedFiles.forEach(item => {
                formData.append('files', item.file)
            })

            const result = await submitReviewAction(formData)

            if (!result.success) {
                throw new Error(result.error || 'Failed to submit review')
            }

            setSubmitStatus('success')
            setTimeout(() => {
                if (onSuccess) onSuccess()
                onClose()
            }, 2000)
        } catch (error: any) {
            console.error('Submission error:', error)
            setSubmitStatus('error')
            setErrorMessage(error.message || 'An unexpected error occurred. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitStatus === 'success') {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center animate-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="text-green-500 w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif text-neutral-900 mb-2">Thank You!</h3>
                <p className="text-neutral-500">Your review has been submitted successfully and will be visible shortly.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8 max-w-2xl mx-auto">
            <div className="space-y-4">
                <label className="block text-sm font-medium text-neutral-700">Your Overall Rating</label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="transition-transform hover:scale-110 focus:outline-none"
                        >
                            <Star
                                size={32}
                                className={`${(hoverRating || rating) >= star
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-neutral-200'
                                    } transition-colors duration-200`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700">Your Name</label>
                <input
                    id="name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="w-full h-12 px-4 rounded-xl border border-neutral-200 focus:border-[#D4BC9B] focus:ring-1 focus:ring-[#D4BC9B] focus-visible:ring-0 focus-visible:ring-offset-0 outline-none transition-all placeholder:text-neutral-300 text-black font-semibold bg-white"
                />
            </div>

            <div className="space-y-4">
                <label htmlFor="content" className="block text-sm font-medium text-neutral-700">Share your experience</label>
                <textarea
                    id="content"
                    required
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What did you love about this piece? How's the craftsmanship?"
                    className="w-full p-4 rounded-xl border border-neutral-200 focus:border-[#D4BC9B] focus:ring-1 focus:ring-[#D4BC9B] focus-visible:ring-0 focus-visible:ring-offset-0 outline-none transition-all placeholder:text-neutral-300 resize-none text-black font-semibold bg-white"
                />
            </div>

            {/* Media Upload Implementation */}
            <div className="space-y-4">
                <label className="block text-sm font-medium text-neutral-700">Add Photos or Video</label>

                {selectedFiles.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                        {selectedFiles.map((item, index) => (
                            <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                                {item.type === 'video' ? (
                                    <video src={item.preview} className="w-full h-full object-cover" />
                                ) : (
                                    <img src={item.preview} alt="Preview" className="w-full h-full object-cover" />
                                )}
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="relative">
                    <input
                        type="file"
                        multiple
                        accept="image/*,video/mp4"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        title=""
                    />
                    <div className="border-2 border-dashed border-neutral-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-neutral-50/50 hover:bg-neutral-50 hover:border-[#D4BC9B] transition-all group">
                        <Upload className="w-8 h-8 text-neutral-300 mb-3 group-hover:text-[#D4BC9B] transition-colors" />
                        <p className="text-sm text-neutral-400 font-medium">Click or drag media</p>
                        <p className="text-[10px] text-neutral-300 uppercase tracking-widest mt-1">Images or MP4 up to 10MB</p>
                    </div>
                </div>
            </div>

            {errorMessage && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg animate-in slide-in-from-top-1">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                </div>
            )}

            <div className="flex items-center gap-4 pt-4">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 h-14 bg-[#D4BC9B] hover:bg-black text-black hover:text-[#D4BC9B] rounded-xl font-black uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50 border-none shadow-sm"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        'Submit Review'
                    )}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="h-14 px-8 border-2 border-neutral-100 rounded-xl font-bold text-neutral-400 hover:bg-neutral-50 hover:border-black hover:text-black transition-all"
                >
                    Cancel
                </Button>
            </div>
        </form>
    )
}
