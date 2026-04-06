'use client'

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from '@/components/ui/dialog'
import { useWhatsApp } from '@/providers/WhatsApp'

export const InquiryModal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { phoneNumber } = useWhatsApp()
    const [name, setName] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [requirements, setRequirements] = React.useState('')
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [isSuccess, setIsSuccess] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    phoneNumber: phone,
                    requirements,
                }),
            })

            if (res.ok) {
                setIsSuccess(true)

                // Construct WhatsApp message
                const message = `Hello, I have a new inquiry:\n\nName: ${name}\nPhone: ${phone}\nRequirements: ${requirements}`
                const encodedMessage = encodeURIComponent(message)
                const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`

                // Open WhatsApp in a new tab after a brief delay so they see the success message
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank')
                }, 1500)

                setName('')
                setPhone('')
                setRequirements('')
            } else {
                alert('Something went wrong. Please try again.')
            }
        } catch (error) {
            console.error('Error submitting inquiry:', error)
            alert('Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog onOpenChange={(open) => {
            if (!open) {
                setIsSuccess(false)
            }
        }}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none bg-transparent shadow-none">
                <DialogTitle className="sr-only">Inquiry Form</DialogTitle>
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative max-h-[90vh] overflow-y-auto">
                    {/* Decorative accent */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D4BC9B] to-[#E6D3BA] rounded-t-2xl" />

                    {isSuccess ? (
                        <div className="text-center py-12 space-y-6">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif text-gray-900 mb-2">Thank You!</h2>
                                <p className="text-gray-500 text-sm">Your inquiry has been received. Our team will contact you shortly.</p>
                            </div>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="text-[#D4BC9B] text-sm font-medium hover:underline"
                            >
                                Send another inquiry
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-serif text-gray-900 mb-2">Request a Quote</h2>
                                <p className="text-sm text-gray-500">Fill out the form below and our team will get back to you shortly.</p>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-1 text-left">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full bg-gray-50 border-none rounded-lg px-5 py-4 text-base text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#D4BC9B]/50 transition-all placeholder:text-gray-400 outline-none"
                                    />
                                </div>
                                <div className="space-y-1 text-left">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+91 "
                                        className="w-full bg-gray-50 border-none rounded-lg px-5 py-4 text-base text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#D4BC9B]/50 transition-all placeholder:text-gray-400 outline-none"
                                    />
                                </div>
                                <div className="space-y-1 text-left">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Requirements</label>
                                    <textarea
                                        required
                                        value={requirements}
                                        onChange={(e) => setRequirements(e.target.value)}
                                        placeholder="Tell us about your space or project..."
                                        rows={4}
                                        className="w-full bg-gray-50 border-none rounded-lg px-5 py-4 text-base text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#D4BC9B]/50 transition-all resize-none placeholder:text-gray-400 outline-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#D4BC9B] text-white font-medium py-4 rounded-lg hover:bg-[#C6AC89] transition-all active:scale-[0.98] mt-2 shadow-lg shadow-[#D4BC9B]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
