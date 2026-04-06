import { AuthProvider } from '@/providers/Auth'
import { EcommerceProvider } from '@payloadcms/plugin-ecommerce/client/react'
import { stripeAdapterClient } from '@payloadcms/plugin-ecommerce/payments/stripe'
import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { SonnerProvider } from '@/providers/Sonner'

import { Currency } from '@payloadcms/plugin-ecommerce/types'

const INR: Currency = {
  code: 'INR',
  decimals: 2,
  label: 'Indian Rupee',
  symbol: '₹',
}

import { WhatsAppProvider } from './WhatsApp'

export const Providers: React.FC<{
  whatsappConfig: any
  children: React.ReactNode
}> = ({ whatsappConfig, children }) => {
  return (
    <WhatsAppProvider config={whatsappConfig}>
      <ThemeProvider>
        <AuthProvider>
          <HeaderThemeProvider>
            <SonnerProvider />
            <EcommerceProvider
              enableVariants={true}
              api={{
                cartsFetchQuery: {
                  depth: 2,
                  populate: {
                    products: {
                      slug: true,
                      title: true,
                      gallery: true,
                      inventory: true,
                      priceInINR: true,
                    },
                    variants: {
                      title: true,
                      inventory: true,
                      priceInINR: true,
                    },
                  },
                },
              }}
              currenciesConfig={{
                defaultCurrency: 'INR',
                supportedCurrencies: [INR],
              }}
              paymentMethods={[
                stripeAdapterClient({
                  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
                }),
              ]}
            >
              {children}
            </EcommerceProvider>
          </HeaderThemeProvider>
        </AuthProvider>
      </ThemeProvider>
    </WhatsAppProvider>
  )
}
