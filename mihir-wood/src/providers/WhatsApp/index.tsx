'use client'

import React, { createContext, useContext, ReactNode } from 'react'

interface WhatsAppConfig {
    phoneNumber: string
    defaultMessage: string
    productInquiryMessage?: string
    callToOrderNumber?: string
}

const WhatsAppContext = createContext<WhatsAppConfig | undefined>(undefined)

export const WhatsAppProvider: React.FC<{
    config: WhatsAppConfig
    children: ReactNode
}> = ({ config, children }) => {
    return (
        <WhatsAppContext.Provider value={config}>
            {children}
        </WhatsAppContext.Provider>
    )
}

export const useWhatsApp = () => {
    const context = useContext(WhatsAppContext)
    if (!context) {
        // Return empty fallback if context is not available
        return {
            phoneNumber: '',
            defaultMessage: '',
            productInquiryMessage: '',
            callToOrderNumber: ''
        }
    }
    return context
}
