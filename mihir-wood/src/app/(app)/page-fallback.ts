import { Page } from '@/payload-types'

export const defaultHomePage: Partial<Page> = {
    title: 'Home',
    hero: {
        type: 'haveli',
        subTitle: 'EMBRACE TIMELESS ELEGANCE.',
        media: { url: '/images/haveli-hero-bg.png' },
        richText: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'heading',
                        tag: 'h1',
                        children: [{ type: 'text', version: 1, text: 'Crafted Traditions for Modern Homes.' }],
                        version: 1,
                    },
                    {
                        type: 'paragraph',
                        children: [{ type: 'text', version: 1, text: 'Explore Haveli collection and Bespoke services.' }],
                        version: 1,
                    },
                ],
                direction: 'ltr',
                format: 'left',
                indent: 0,
                version: 1,
            },
        },
        links: [
            {
                link: {
                    type: 'custom',
                    url: '/shop',
                    label: 'Explore Haveli Collection',
                    appearance: 'primary',
                },
            },
            {
                link: {
                    type: 'custom',
                    url: '/contact',
                    label: 'Request Bespoke Pricing',
                    appearance: 'outline',
                },
            },
        ],
    } as any,
    layout: [
        {
            blockType: 'categoryCircles',
            title: 'Product Categories',
            selectedCategories: [
                {
                    title: 'Sofa',
                    slug: 'sofa',
                    image: { url: '/images/categories/sofa.png' },
                },
                {
                    title: 'Teak Bed',
                    slug: 'teak-bed',
                    image: { url: '/images/categories/teak-bed.png' },
                },
                {
                    title: 'Dining Table',
                    slug: 'dining-table',
                    image: { url: '/images/categories/dining-table.png' },
                },
                {
                    title: 'Smart Table',
                    slug: 'smart-table',
                    image: { url: '/images/categories/smart-table.png' },
                },
                {
                    title: 'Wardrobe',
                    slug: 'wardrobe',
                    image: { url: '/images/categories/wardrobe.png' },
                },
                {
                    title: 'Work Desk',
                    slug: 'work-desk',
                    image: { url: '/images/categories/smart-table.png' }, // Placeholder image
                },
            ],
        } as any,
        {
            blockType: 'productSection',
            layout: 'grid',
            populateBy: 'selection',
            selectedProducts: [
                {
                    id: 1,
                    title: 'Premium Photos',
                    slug: 'premium-photos-1',
                    priceInINR: 49.9,
                    meta: { image: { url: '/images/categories/teak-bed.png' } },
                },
                {
                    id: 2,
                    title: 'Premium Carvings',
                    slug: 'premium-carvings',
                    priceInINR: 39.9,
                    meta: { image: { url: '/images/categories/wardrobe.png' } },
                },
                {
                    id: 3,
                    title: 'Antique Chests',
                    slug: 'antique-chests',
                    priceInINR: 49.9,
                    meta: { image: { url: '/images/categories/smart-table.png' } },
                },
                {
                    id: 4,
                    title: 'Premium Photos',
                    slug: 'premium-photos-2',
                    priceInINR: 49.9,
                    meta: { image: { url: '/images/categories/dining-table.png' } },
                },
                {
                    id: 5,
                    title: 'Premium Board Linings',
                    slug: 'premium-board-linings',
                    priceInINR: 29.8,
                    meta: { image: { url: '/images/categories/sofa.png' } },
                },
                {
                    id: 6,
                    title: 'Premium Photos',
                    slug: 'premium-photos-3',
                    priceInINR: 39.9,
                    meta: { image: { url: '/images/categories/teak-bed.png' } },
                },
                {
                    id: 7,
                    title: 'Premium Photos',
                    slug: 'premium-photos-4',
                    priceInINR: 49.5,
                    meta: { image: { url: '/images/categories/wardrobe.png' } },
                },
                {
                    id: 8,
                    title: 'Premium Photos',
                    slug: 'premium-photos-5',
                    priceInINR: 49.9,
                    meta: { image: { url: '/images/categories/dining-table.png' } },
                },
            ],
        } as any,
        {
            blockType: 'bulkOrderBanner',
            title: 'TRANSFORM YOUR SPACE',
            highlightText: 'AT SCALE',
            description: 'Mihir Wood provides premium bespoke furniture for offices, hotels, and luxury residences. Experience uncompromising quality and timeless wood craftsmanship.',
            image: { url: '/images/haveli-hero-bg.png' },
            links: [
                {
                    link: {
                        type: 'custom',
                        label: 'CONTACT FOR BULK PRICING',
                        url: '/contact',
                        appearance: 'primary',
                    },
                },
                {
                    link: {
                        type: 'custom',
                        label: 'VIEW BULK PORTFOLIO',
                        url: '/projects',
                        appearance: 'default',
                    },
                },
            ],
        } as any,
        {
            blockType: 'productSection',
            title: 'NEW ARRIVALS - SEASON 2026',
            layout: 'carousel',
            populateBy: 'selection',
            selectedProducts: [
                {
                    id: 101,
                    title: 'SOFA',
                    slug: 'new-arrival-sofa',
                    priceInINR: 19000,
                    meta: { image: { url: '/images/categories/sofa.png' } },
                },
                {
                    id: 102,
                    title: 'DINING TABLE',
                    slug: 'new-arrival-dining-table',
                    priceInINR: 19000,
                    meta: { image: { url: '/images/categories/dining-table.png' } },
                },
                {
                    id: 103,
                    title: 'CHAIR',
                    slug: 'new-arrival-chair',
                    priceInINR: 19000,
                    meta: { image: { url: '/images/categories/teak-bed.png' } },
                },
                {
                    id: 104,
                    title: 'SMART TABLE',
                    slug: 'new-arrival-smart-table',
                    priceInINR: 19000,
                    meta: { image: { url: '/images/categories/smart-table.png' } },
                },
            ],
        } as any,
        {
            blockType: 'trustStats',
            stats: [
                { icon: 'users', value: '12,000+', label: 'Happy Families' },
                { icon: 'home', value: '450+', label: 'Projects Completed' },
                { icon: 'award', value: '25+', label: 'Years Experience' },
                { icon: 'clock', value: '24/7', label: 'Customer Support' },
            ],
        } as any,
        {
            blockType: 'customFurniture',
            title: 'Bring Your Vision to Life',
            formTitle: 'Design Your Own Masterpiece',
            formSubtitle: 'BESPOKE FURNITURE JUST FOR YOU',
            mainImage: { url: '/images/categories/sofa.png' },
            samples: [
                { image: { url: '/images/categories/teak-bed.png' } },
                { image: { url: '/images/categories/dining-table.png' } },
            ],
        } as any,
        {
            blockType: 'manufacturingProcess',
            title: 'The Art of Crafting',
            subtitle: 'HOW WE BRING EXCELLENCE TO YOUR HOME',
            steps: [
                { icon: 'trees', title: 'Wood Selection', description: 'We handpick the finest teak and hardwood for durability.' },
                { icon: 'pentool', title: 'Precision Design', description: 'Every piece is mathematically designed for comfort and style.' },
                { icon: 'hammer', title: 'Expert Crafting', description: 'Our master craftsmen polish every detail to perfection.' },
                { icon: 'truck', title: 'Careful Delivery', description: 'Safe and secure delivery at your doorstep.' },
            ],
        } as any,
        {
            blockType: 'reviewsSection',
            title: 'Voices of Trust',
            subtitle: 'Real Stories From Real Homes',
            populateBy: 'selection',
            selectedReviews: [
                {
                    customerName: 'Rahul Sharma',
                    location: 'Mumbai, India',
                    content: 'The teak wood dining table we ordered is a masterpiece. The craftsmanship is impeccable!',
                    rating: 5,
                },
                {
                    customerName: 'Priya Kapoor',
                    location: 'Delhi, India',
                    content: 'Mihir Wood truly understands luxury. Our new lounge furniture is stunning.',
                    rating: 5,
                },
                {
                    customerName: 'Ansh Mehta',
                    location: 'Ahmedabad, Gujarat',
                    content: 'Excellent quality and service. The custom bed is exactly what we wanted.',
                    rating: 5,
                },
            ],
        } as any,
        {
            blockType: 'inquirySection',
            title: 'Still Have Questions?',
            description: 'Send us your requirements and our furniture experts will get back to you within 24 hours.',
            image: { url: '/images/categories/wardrobe.png' },
        } as any,
    ],
}
export const defaultAboutPage: Partial<Page> = {
    title: 'About Us',
    hero: {
        type: 'haveli',
        subTitle: 'SINCE 1998.',
        media: { url: '/images/bulk/hero.png' },
        richText: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'heading',
                        tag: 'h1',
                        children: [{ type: 'text', version: 1, text: 'How We Work' }],
                        version: 1,
                    },
                    {
                        type: 'paragraph',
                        children: [{ type: 'text', version: 1, text: 'We follow a seamless, end-to-end process to deliver custom hotel furniture that reflects your brand and enhances guest comfort.' }],
                        version: 1,
                    },
                ],
                direction: 'ltr',
                format: 'left',
                indent: 0,
                version: 1,
            },
        },
        links: [
            {
                link: {
                    type: 'custom',
                    url: '/contact',
                    label: 'BOOK A CONSULTATION',
                    appearance: 'primary',
                },
            },
        ],
    } as any,
    layout: [
        {
            blockType: 'projectProcess',
            title: 'Design Your Dream Space',
            subtitle: 'Complete Furniture Solutions for Hospitality & Commercial Spaces',
            steps: [
                {
                    title: 'Requirement Analysis',
                    description: 'We begin by thoroughly understanding your space, functional goals, and brand identity. Our team leverages advanced digital tools, VR walkthroughs, and deep design expertise to shape a practical and aesthetic project blueprint customized to your business needs.',
                    image: { url: '/images/bulk/requirement_analysis.png' },
                },
                {
                    title: 'Design Visualization & Quotation',
                    description: 'Custom 3D renders, VR experiences, and curated product suggestions are created for your review. A complete quotation is provided within 48 hours, allowing faster project evaluation and seamless approvals.',
                    image: { url: '/images/bulk/design_visualization.png' },
                },
                {
                    title: 'In-House Manufacturing Excellence',
                    description: 'With 15k state-of-the-art dedicated manufacturing units spread across 1.5 lakh sq. ft., CNC technology, and skilled artisans, we deliver consistency, scalability, and speed.',
                    image: { url: '/images/bulk/manufacturing_excellence.png' },
                },
                {
                    title: 'Seamless Execution & Delivery',
                    description: 'From manufacturing to last-mile delivery and on-site installation, we manage the entire process end-to-end. With a strong network of 280+ delivery centers across India, we guarantee timely execution and dedicated support.',
                    image: { url: '/images/bulk/execution_delivery.png' },
                },
            ],
        } as any,
        {
            blockType: 'inquirySection',
            title: 'HAVE SOMETHING IN MIND?',
            description: 'Whether it is a custom furniture piece for your home or a large-scale project for your business, we are here to help.',
            image: { url: '/images/bulk/cat-bedroom.png' },
        } as any,
    ],
}

export const defaultBulkOrdersPage: Partial<Page> = {
    title: 'Bulk Order Solutions',
    hero: {
        type: 'highImpact',
        subTitle: 'CUSTOM FURNITURE SOLUTIONS FOR PROJECTS & BUSINESSES',
        media: { url: '/images/bulk/hero.png' },
        richText: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'heading',
                        tag: 'h1',
                        children: [{ type: 'text', version: 1, text: 'BULK ORDER' }],
                        version: 1,
                    },
                    {
                        type: 'paragraph',
                        children: [{ type: 'text', version: 1, text: "Elevate your spaces with tailored furniture for hotels, offices, restaurants, and more with Mihir Wood's bespoke craftsmanship." }],
                        version: 1,
                    },
                ],
                direction: 'ltr',
                format: 'left',
                indent: 0,
                version: 1,
            },
        },
        links: [
            {
                link: {
                    type: 'custom',
                    url: '/contact',
                    label: 'GET A QUOTE',
                    appearance: 'primary',
                },
            },
        ],
    } as any,
    layout: [
        {
            blockType: 'featureGrid',
            variant: 'cards',
            title: 'OUR BULK ORDER SERVICES',
            subtitle: 'We offer customized furniture solutions for:',
            features: [
                {
                    icon: 'bed',
                    title: 'HOTELS & RESORTS',
                    description: 'Customized furniture for luxury guest rooms and lobbies.',
                },
                {
                    icon: 'briefcase',
                    title: 'OFFICES',
                    description: 'Ergonomic and aesthetic workspace solutions at scale.',
                },
                {
                    icon: 'utensils',
                    title: 'RESTAURANTS & CAFES',
                    description: 'Durable and stylish dining sets for hospitality businesses.',
                },
                {
                    icon: 'home',
                    title: 'VILLAS & RESIDENCES',
                    description: 'Complete high-end furniture packages for residential developers.',
                },
            ],
        } as any,
        {
            blockType: 'projectProcess',
            variant: 'grid',
            title: 'OUR BULK ORDER PROCESS',
            steps: [
                {
                    title: 'CONSULTATION',
                    description: 'Discuss your project needs and specifications with our experts.',
                    image: { url: '/images/bulk/requirement_analysis.png' },
                },
                {
                    title: 'DESIGN & QUOTATION',
                    description: 'Receive personalized designs and a tailored pricing quote.',
                    image: { url: '/images/bulk/design_visualization.png' },
                },
                {
                    title: 'PRODUCTION',
                    description: 'Skilled craftsmen bring your custom furniture to life.',
                    image: { url: '/images/bulk/manufacturing_excellence.png' },
                },
                {
                    title: 'ON-TIME DELIVERY',
                    description: 'Prompt delivery and professional on-site installation.',
                    image: { url: '/images/bulk/execution_delivery.png' },
                },
            ],
        } as any,
        {
            blockType: 'inquirySection',
            variant: 'simple',
            title: 'REQUEST A BULK ORDER QUOTE',
            description: 'Provide your project details and our team will get back to you with a personalized proposal.',
            image: { url: '/images/bulk/cat-custom.png' },
        } as any,
    ],
}
