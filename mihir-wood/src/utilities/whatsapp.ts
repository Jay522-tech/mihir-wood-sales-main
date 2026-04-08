export const WHATSAPP_NUMBER = '' // Removed hardcoded fallback

export const getWhatsAppLink = (message: string, phoneNumber: string = WHATSAPP_NUMBER) => {
    return `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`
}

export const formatCartMessage = (cart: any) => {
    if (!cart || !cart.items || cart.items.length === 0) return 'Hello, I would like to inquire about some products.'

    let message = 'Hello, I am interested in the following items from your store:\n\n'

    cart.items.forEach((item: any, index: number) => {
        const product = item.product
        const variant = item.variant
        const title = typeof product === 'object' ? product.title : 'Product'
        const quantity = item.quantity || 1
        const price = variant?.priceInINR || product?.priceInINR

        message += `${index + 1}. *${title}*`

        if (variant && typeof variant === 'object' && variant.options) {
            const options = variant.options
                .map((opt: any) => (typeof opt === 'object' ? opt.label : opt))
                .join(', ')
            message += ` (${options})`
        }

        message += `\n   Qty: ${quantity}`
        if (price) {
            message += ` | Price: ₹${price}`
        }
        message += '\n'
    })

    if (cart.subtotal) {
        message += `\n*Total Subtotal: ₹${cart.subtotal}*`
    }

    message += '\n\nPlease let me know the availability and next steps. Thank you!'
    return message
}

export const formatProductMessage = (product: any, baseMessage?: string) => {
    if (!product) return baseMessage || 'Hello, I would like to inquire about a product.'

    const title = product.title
    const price = product.priceInINR
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/products/${product.slug}`

    // Get the first image from gallery for the admin to see
    const imageUrl = product.gallery?.[0]?.image?.url
        ? `${typeof window !== 'undefined' ? window.location.origin : ''}${product.gallery[0].image.url}`
        : null

    let message = `${baseMessage || "Hello, I'm interested in this product: "}*${title}*\n`
    if (price) {
        message += `Price: ₹${price}\n`
    }
    if (imageUrl) {
        message += `Image: ${imageUrl}\n`
    }
    message += `Please let me know more details. Thank you!\n\nProduct Link: ${url}`

    return message
}

export const formatBespokeMessage = (details: Record<string, any>, steps?: any[]) => {
    let message = `*PROJECT INQUIRY: BESPOKE DESIGN*\n`
    message += `--------------------------------\n\n`

    if (details.name) message += `*Customer:* ${details.name}\n`
    if (details.phone) message += `*Phone:* ${details.phone}\n`
    if (details.email) message += `*Email:* ${details.email}\n`

    message += `\n*Project Details:*\n`

    if (steps && steps.length > 0) {
        steps.forEach((s: any) => {
            const val = details[s.stepName] || details[s.stepName.toLowerCase()]
            if (val) {
                message += `• *${s.stepName}:* ${val}\n`
            }
        })
    } else {
        // Fallback for old static structure
        if (details.category) message += `• *Project:* ${details.category}\n`
        if (details.style) message += `• *Style:* ${details.style}\n`
        if (details.budget) message += `• *Budget:* ${details.budget}\n`
        if (details.timeline) message += `• *Timeline:* ${details.timeline}\n`
    }

    if (details.units && details.units !== '1') message += `• *Scale:* ${details.units} Units\n`
    if (details.location) message += `• *Location:* ${details.location}\n`

    if (details.message) {
        message += `\n*Additional Requirements:*\n${details.message}\n`
    }

    message += `\n--------------------------------\n`
    message += `_Sent via Mihir Wood Bespoke Design Portal_`

    return message
}
