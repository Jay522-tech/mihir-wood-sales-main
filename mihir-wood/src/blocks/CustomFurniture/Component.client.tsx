'use client'
import React, { useState } from 'react'
import {
    ChevronLeft,
    ChevronRight,
    Send,
    Building,
    Home,
    Wallet,
    Calendar,
    User,
    MapPin,
    CheckCircle2,
    Sparkles,
    Timer,
    Hotel,
    Umbrella,
    Utensils,
    Crown,
    Leaf,
    Diamond,
    Waves,
    Box,
    Sofa,
    Bed,
    Coffee,
    ShoppingBag
} from 'lucide-react'
import { useWhatsApp } from '@/providers/WhatsApp'
import { formatBespokeMessage, getWhatsAppLink } from '@/utilities/whatsapp'
import { cn } from '@/utilities/cn'
import type { CustomFurnitureBlock } from '@/payload-types'

const STEPS = [
    { id: 1, name: 'Project', icon: <Building className="w-4 h-4" /> },
    { id: 2, name: 'Style', icon: <Sparkles className="w-4 h-4" /> },
    { id: 3, name: 'Scale', icon: <MapPin className="w-4 h-4" /> },
    { id: 4, name: 'Budget', icon: <Wallet className="w-4 h-4" /> },
    { id: 5, name: 'Timeline', icon: <Timer className="w-4 h-4" /> },
    { id: 6, name: 'Details', icon: <User className="w-4 h-4" /> },
    { id: 7, name: 'Confirm', icon: <CheckCircle2 className="w-4 h-4" /> },
]

const getIconComponent = (iconName?: string | null) => {
    if (!iconName) return <Sparkles className="w-5 h-5" />

    // Check if it's an emoji (character length check isn't perfect but works for common emojis)
    // Most emojis are handled by the browser as text
    if (iconName.length <= 2 || /\p{Emoji}/u.test(iconName)) {
        return <span className="text-xl leading-none flex items-center justify-center">{iconName}</span>
    }

    switch (iconName.toLowerCase()) {
        case 'hotel': return <Hotel className="w-5 h-5" />
        case 'resort': return <Umbrella className="w-5 h-5" />
        case 'restaurant': return <Utensils className="w-5 h-5" />
        case 'villa': return <Home className="w-5 h-5" />
        case 'office': return <Building className="w-5 h-5" />
        case 'custom':
        case 'sparkles': return <Sparkles className="w-5 h-5" />
        case 'box': return <Box className="w-5 h-5" />
        case 'crown': return <Crown className="w-5 h-5" />
        case 'leaf': return <Leaf className="w-5 h-5" />
        case 'diamond': return <Diamond className="w-5 h-5" />
        case 'waves': return <Waves className="w-5 h-5" />
        case 'sofa': return <Sofa className="w-5 h-5" />
        case 'bed': return <Bed className="w-5 h-5" />
        case 'coffee': return <Coffee className="w-5 h-5" />
        case 'shopping-bag': return <ShoppingBag className="w-5 h-5" />
        default: return <Sparkles className="w-5 h-5" />
    }
}

// Fallback Data
const DEFAULT_CATEGORIES = [
    { label: 'Hotel', subLabel: 'Rooms, Suites & Lobbies', icon: 'hotel' },
    { label: 'Resort', subLabel: 'Indoor & Outdoor Spaces', icon: 'resort' },
    { label: 'Restaurant', subLabel: 'Dining & Lounge Areas', icon: 'restaurant' },
    { label: 'Villa / Bungalow', subLabel: 'Private Luxury Residences', icon: 'villa' },
    { label: 'Commercial Office', subLabel: 'Workspaces & Boardrooms', icon: 'office' },
    { label: 'Custom Project', subLabel: 'Something Unique', icon: 'custom' },
]

const DEFAULT_STYLES = [
    { label: 'Modern Minimal', subLabel: 'Clean lines, subtle tones, functional luxury', icon: 'box' },
    { label: 'Royal & Classic', subLabel: 'Ornate detailing, deep woods, timeless grandeur', icon: 'crown' },
    { label: 'Rustic & Natural', subLabel: 'Raw grain, warm tones, earthy authenticity', icon: 'leaf' },
    { label: 'Contemporary Luxury', subLabel: 'Bold forms, premium finishes, designer edge', icon: 'diamond' },
    { label: 'Coastal & Resort', subLabel: 'Light woods, breezy feel, relaxed elegance', icon: 'waves' },
]

const DEFAULT_BUDGETS = [
    { label: '₹5L - ₹15L', subLabel: 'Small to Mid Projects' },
    { label: '₹15L - ₹50L', subLabel: 'Mid to Large Projects' },
    { label: '₹50L - ₹1Cr', subLabel: 'Large Premium Projects' },
    { label: '₹1Cr+', subLabel: 'Ultra Luxury / Bulk Orders' },
]

const DEFAULT_TIMELINES = [
    { label: 'As Soon As Possible', icon: '⚡' },
    { label: '1 – 3 Months', icon: '📅' },
    { label: '3 – 6 Months', icon: '🗓️' },
    { label: '6+ Months / Planning Stage', icon: '🔭' },
]

export const CustomFurnitureClient: React.FC<CustomFurnitureBlock> = (props) => {
    const { phoneNumber } = useWhatsApp()
    const [stepIndex, setStepIndex] = useState(0)
    const [direction, setDirection] = useState(1)

    // Default steps if none are provided in CMS
    const steps = props.steps?.length ? props.steps : [
        { blockType: 'iconGrid', stepName: 'Category', stepTitle: 'What are we designing?', stepSubtitle: 'Select the type of project', options: DEFAULT_CATEGORIES },
        { blockType: 'iconGrid', stepName: 'Style', stepTitle: 'Choose your aesthetic', stepSubtitle: 'Select a style', options: DEFAULT_STYLES },
        { blockType: 'rangeSlider', stepName: 'Scale', stepTitle: 'How large is your project?', stepSubtitle: 'Approximate units', suffix: 'units / rooms', min: 1, max: 500 },
        { blockType: 'listSelection', stepName: 'Budget', stepTitle: "What's your budget?", stepSubtitle: 'Investment range', options: DEFAULT_BUDGETS },
        { blockType: 'listSelection', stepName: 'Timeline', stepTitle: 'When do you need it?', stepSubtitle: 'Planning timeline', options: DEFAULT_TIMELINES },
        { blockType: 'contactForm', stepName: 'Contact', stepTitle: 'Almost there', stepSubtitle: 'Who should we reach?' }
    ]

    const [formData, setFormData] = useState<Record<string, any>>({
        location: '',
        name: '',
        phone: '+91 ',
        email: '',
        message: '',
        units: '1'
    })

    const currentStep = steps[stepIndex]
    const isLastStep = stepIndex === steps.length - 1
    const isFinalReview = stepIndex === steps.length // We'll add one internal step for summary

    const updateData = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const nextStep = () => {
        setDirection(1)
        setStepIndex(s => Math.min(s + 1, steps.length))
    }
    const prevStep = () => {
        setDirection(-1)
        setStepIndex(s => Math.max(s - 1, 0))
    }

    const handleSubmit = async () => {
        const message = formatBespokeMessage(formData, steps)

        try {
            await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    phoneNumber: formData.phone,
                    requirements: message,
                    status: 'new',
                }),
            })
        } catch (error) {
            console.error('Error saving inquiry:', error)
        }
        const link = getWhatsAppLink(message, phoneNumber)
        window.open(link, '_blank')
    }

    // Validation
    const canContinue = () => {
        if (isFinalReview) return true
        const s = currentStep as any
        if (s.blockType === 'iconGrid' || s.blockType === 'listSelection') {
            return !!formData[s.stepName]
        }
        if (s.blockType === 'rangeSlider') {
            return !!formData.location
        }
        if (s.blockType === 'contactForm') {
            return !!formData.name && formData.phone.trim() !== '+91'
        }
        return true
    }

    return (
        <section id="custom" className="bg-[#0D0B0A] py-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E6B980]/5 rounded-full blur-[140px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#E6B980]/5 rounded-full blur-[140px] -ml-64 -mb-64" />

            <div className="container px-4 relative z-10">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10 space-y-3">
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#E6B980]/10 border border-[#E6B980]/20 text-[#E6B980] text-[10px] font-black tracking-[0.3em] uppercase">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Mihir Wood Royal Heritage</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                            {props.formTitle || 'Crafting your masterpiece'}
                        </h2>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="mb-12 relative px-2">
                        {/* Background Track Line */}
                        <div className="absolute top-4 left-0 w-full h-[1px] bg-white/10" />

                        {/* Progress Fill Line */}
                        <div
                            className="absolute top-4 left-0 h-[1px] bg-gradient-to-r from-[#E6B980] to-[#C48C46] transition-all duration-1000 ease-in-out shadow-[0_0_20px_rgba(230,185,128,0.4)]"
                            style={{ width: `${(stepIndex / steps.length) * 100}%` }}
                        />

                        <div className="flex items-center justify-between relative z-10">
                            {steps.map((s: any, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-700 border text-[10px] font-black",
                                        stepIndex >= idx
                                            ? "bg-gradient-to-br from-[#E6B980] to-[#C48C46] border-[#E6B980] text-black shadow-[0_0_20px_rgba(230,185,128,0.4)] scale-110"
                                            : "bg-[#0D0B0A] border-white/10 text-white/20"
                                    )}>
                                        {idx + 1}
                                    </div>
                                </div>
                            ))}
                            <div className="flex flex-col items-center">
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-700 border",
                                    isFinalReview
                                        ? "bg-gradient-to-br from-[#E6B980] to-[#C48C46] border-[#E6B980] text-black shadow-[0_0_20px_rgba(230,185,128,0.4)] scale-110"
                                        : "bg-[#0D0B0A] border-white/10 text-white/20"
                                )}>
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#1A1614]/60 backdrop-blur-2xl border border-white/5 p-6 md:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[400px] flex flex-col justify-between overflow-hidden relative">
                        <div className="flex-1">
                            {!isFinalReview && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div>
                                        <span className="text-[#E6B980] text-[10px] font-black tracking-[0.3em] uppercase">Step {stepIndex + 1} of {steps.length} · {currentStep.stepName}</span>
                                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mt-2">{currentStep.stepTitle}</h3>
                                        <p className="text-white/40 text-sm mt-2 font-medium italic">{currentStep.stepSubtitle}</p>
                                    </div>

                                    {/* Icon Grid Block */}
                                    {currentStep.blockType === 'iconGrid' && (
                                        <div className="grid grid-cols-2 gap-3">
                                            {(currentStep.options || []).map((opt: any) => (
                                                <button
                                                    key={opt.label}
                                                    type="button"
                                                    onClick={() => updateData(currentStep.stepName, opt.label)}
                                                    className={cn(
                                                        "group p-4 rounded-xl border text-left transition-all duration-300 active:scale-[0.98] relative overflow-hidden",
                                                        formData[currentStep.stepName] === opt.label ? "bg-gradient-to-br from-[#E6B980] to-[#C48C46] border-[#E6B980] text-black shadow-xl" : "bg-[#1A1614]/50 border-white/5 text-white hover:border-[#E6B980]/40"
                                                    )}
                                                >
                                                    <div className={cn("w-10 h-10 rounded-xl mb-3 flex items-center justify-center transition-colors duration-300", formData[currentStep.stepName] === opt.label ? "bg-black/10" : "bg-white/5 group-hover:bg-[#E6B980]/10")}>
                                                        {getIconComponent(opt.icon)}
                                                    </div>
                                                    <span className="block font-black uppercase tracking-[0.2em] text-[10px] mb-1">{opt.label}</span>
                                                    <span className={cn("block text-[8px] font-bold uppercase tracking-widest leading-none", formData[currentStep.stepName] === opt.label ? "text-black/40" : "text-white/20")}>{opt.subLabel}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* List Selection Block */}
                                    {currentStep.blockType === 'listSelection' && (
                                        <div className="grid grid-cols-1 gap-3">
                                            {(currentStep.options || []).map((opt: any) => (
                                                <button
                                                    key={opt.label}
                                                    type="button"
                                                    onClick={() => updateData(currentStep.stepName, opt.label)}
                                                    className={cn(
                                                        "p-5 rounded-2xl border text-left transition-all duration-300 active:scale-[0.99] flex items-center gap-4 group",
                                                        formData[currentStep.stepName] === opt.label ? "bg-[#E6B980]/10 border-[#E6B980] text-[#E6B980]" : "bg-[#1A1614]/30 border-white/5 text-white hover:border-white/20"
                                                    )}
                                                >
                                                    {opt.icon && <span className="text-2xl group-hover:scale-110 transition-transform">{opt.icon}</span>}
                                                    <div>
                                                        <span className="block font-black uppercase tracking-[0.2em] text-[11px]">{opt.label}</span>
                                                        {opt.subLabel && <span className="block text-[9px] font-bold text-white/30 uppercase mt-0.5">{opt.subLabel}</span>}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Range Slider Block */}
                                    {currentStep.blockType === 'rangeSlider' && (
                                        <div className="space-y-12 py-4">
                                            <div className="space-y-6">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-4xl font-black text-[#E6B980] italic">{formData.units} <span className="text-sm font-bold text-white/20 uppercase not-italic tracking-widest ml-2">{currentStep.suffix || 'units'}</span></span>
                                                </div>
                                                <input
                                                    type="range" min={currentStep.min || 1} max={currentStep.max || 500}
                                                    value={formData.units}
                                                    onChange={(e) => updateData('units', e.target.value)}
                                                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#E6B980]"
                                                    style={{
                                                        background: `linear-gradient(to right, #E6B980 0%, #E6B980 ${((Math.max(Number(currentStep.min || 1), Number(formData.units || 1)) - Number(currentStep.min || 1)) / (Number(currentStep.max || 500) - Number(currentStep.min || 1))) * 100}%, rgba(255, 255, 255, 0.05) ${((Math.max(Number(currentStep.min || 1), Number(formData.units || 1)) - Number(currentStep.min || 1)) / (Number(currentStep.max || 500) - Number(currentStep.min || 1))) * 100}%, rgba(255, 255, 255, 0.05) 100%)`
                                                    }}
                                                />
                                                <div className="flex justify-between text-[9px] font-black text-white/10 uppercase tracking-[0.3em]">
                                                    <span>{currentStep.min || 1} {currentStep.suffix || 'Units'}</span>
                                                    <span>{currentStep.max || 500}+ {currentStep.suffix || 'Units'}</span>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E6B980]" />
                                                <input
                                                    type="text" placeholder="City / Site Location" value={formData.location}
                                                    onChange={(e) => updateData('location', e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-full pl-14 pr-8 py-5 text-[11px] font-black tracking-widest text-white focus:border-[#E6B980] outline-none"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Contact Form Block */}
                                    {currentStep.blockType === 'contactForm' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4">
                                            <input
                                                type="text" placeholder="Full Name" value={formData.name}
                                                onChange={(e) => updateData('name', e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xs font-bold text-white focus:border-[#E6B980] outline-none"
                                            />
                                            <input
                                                type="tel" placeholder="Phone Number" value={formData.phone}
                                                onChange={(e) => updateData('phone', e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xs font-bold text-white focus:border-[#E6B980] outline-none"
                                            />
                                            <input
                                                type="email" placeholder="Email Address" value={formData.email}
                                                onChange={(e) => updateData('email', e.target.value)}
                                                className="md:col-span-2 w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xs font-bold text-white focus:border-[#E6B980] outline-none"
                                            />
                                            <textarea
                                                placeholder="Any specific requirements?" value={formData.message}
                                                onChange={(e) => updateData('message', e.target.value)}
                                                rows={4}
                                                className="md:col-span-2 w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold text-white focus:border-[#E6B980] outline-none resize-none"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Final Review Step */}
                            {isFinalReview && (
                                <div className="space-y-4 flex flex-col justify-center min-h-[300px] animate-in fade-in zoom-in-95 duration-700">
                                    <div className="text-center space-y-3">
                                        <div className="w-16 h-16 bg-[#E6B980]/10 border border-[#E6B980]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="w-10 h-10 text-[#E6B980]" />
                                        </div>
                                        <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">Ready to <br /> Finalize?</h3>
                                        <p className="text-white/40 text-sm max-w-sm mx-auto font-medium">Please review your journey summary below.</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1 border-y border-neutral-800 py-4 max-h-[200px] overflow-y-auto">
                                        {steps.map((s: any, idx) => {
                                            const val = formData[s.stepName] || (s.blockType === 'rangeSlider' ? `${formData.units} Units` : null)
                                            if (!val && s.blockType !== 'rangeSlider') return null
                                            return (
                                                <div key={idx} className="flex justify-between items-center py-1">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600">{s.stepName}</span>
                                                    <span className="text-xs font-bold text-[#E6B980] truncate ml-4">{val}</span>
                                                </div>
                                            )
                                        })}
                                        {formData.location && (
                                            <div className="flex justify-between items-center py-1">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600">Location</span>
                                                <span className="text-xs font-bold text-[#E6B980]">{formData.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-4 pt-6">
                            {stepIndex > 0 && (
                                <button onClick={prevStep} className="px-8 py-5 rounded-full border border-white/5 text-white/40 hover:text-[#E6B980] hover:border-[#E6B980]/40 transition-all font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-2 bg-[#1A1614]/30">
                                    <ChevronLeft className="w-3 h-3" /> Back
                                </button>
                            )}
                            {!isFinalReview ? (
                                <button
                                    onClick={nextStep}
                                    disabled={!canContinue()}
                                    className="flex-1 bg-[#E6B980] hover:bg-white text-black py-5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-30 disabled:grayscale"
                                >
                                    {stepIndex === steps.length - 1 ? 'Review Details' : 'Continue'} <ChevronRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button onClick={handleSubmit} className="flex-1 bg-gradient-to-r from-[#E6B980] via-[#C48C46] to-[#E6B980] bg-[length:200%_auto] hover:bg-right text-black py-6 rounded-full font-black uppercase tracking-[0.3em] text-[11px] transition-all duration-700 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(230,185,128,0.3)] group">
                                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Finalize via WhatsApp
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
