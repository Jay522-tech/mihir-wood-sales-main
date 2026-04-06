import { Page } from '@/payload-types'

export const defaultHomePage: Partial<Page> = {
    title: 'Home',
    hero: {
        type: 'none',
        richText: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'heading',
                        tag: 'h1',
                        children: [{ type: 'text', version: 1, text: 'Welcome to Mihir Wood' }],
                        version: 1,
                    },
                    {
                        type: 'paragraph',
                        children: [{ type: 'text', version: 1, text: 'Please configure this page in the Admin Panel.' }],
                        version: 1,
                    },
                ],
                direction: 'ltr',
                format: 'left',
                indent: 0,
                version: 1,
            },
        },
    } as any,
    layout: [],
}

export const defaultAboutPage: Partial<Page> = {
    title: 'About Us',
    hero: {
        type: 'none',
        richText: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'heading',
                        tag: 'h1',
                        children: [{ type: 'text', version: 1, text: 'About Us' }],
                        version: 1,
                    },
                ],
                direction: 'ltr',
                format: 'left',
                indent: 0,
                version: 1,
            },
        },
    } as any,
    layout: [],
}

export const defaultBulkOrdersPage: Partial<Page> = {
    title: 'Bulk Order Solutions',
    hero: {
        type: 'banner',
        slides: [
            {
                title: 'Bulk Orders',
                subTitle: 'PREMIUM FURNITURE FOR EVERY SPACE',
                richText: {
                    root: {
                        type: 'root',
                        children: [
                            {
                                type: 'paragraph',
                                children: [{ type: 'text', version: 1, text: 'Transform your commercial spaces with our customized bulk furniture solutions. Partner with us for exclusive deals and flawless installations.' }],
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: 'left',
                        indent: 0,
                        version: 1,
                    },
                },
                contentAlignment: 'center',
                links: [{ link: { type: 'custom', url: '#', label: 'Get a Quote' } }],
                image: {
                    url: '/media/furniture-store-with-different-sofas-and-garden-view-through-the-window.webp',
                    alt: 'Bulk Furniture Solutions'
                } as any,
            },
        ],
    } as any,
    layout: [
        {
            blockType: 'bulkOrderStats',
            mainTitle: 'Why Choose Mihir Wood',
            mainSubtitle: 'For Your Interior Design Needs',
            title: 'Your Trusted Partner for Bulk Orders',
            subtitle: 'From concept to delivery, we ensure interiors that impress and last.',
            stats: [
                { icon: 'users', value: '20 Lakh+', label: 'Happy Customers' },
                { icon: 'truck', value: '45 Days*', label: 'Delivery & Installation' },
                { icon: 'shield', value: '100+', label: 'Project Done' },
                { icon: 'pen-tool', value: '300+', label: 'Design Experts' },
                { icon: 'factory', value: '15 Lakh Sq. Ft.', label: 'Manufacturing Facility' },
                { icon: 'ruler', value: 'Customize', label: 'Designs for Your Space' },
            ],
            links: [{ link: { type: 'custom', url: '#', label: 'How We Work' } }],
            image: { url: '/api/media/file/blog1.png', alt: 'Trusted Partner' } as any,
        },
        {
            blockType: 'oneStopShop',
            title: 'One-Stop Shop For All Things',
            subtitle: 'From expert design to flawless installation – everything under one roof',
            categories: [
                {
                    title: 'Hospitality Furniture',
                    items: [{ item: 'Reception & Lobby' }, { item: 'Bedroom' }, { item: 'Restaurant & Bar' }, { item: 'Outdoor Furniture' }],
                    image: { url: '/media/sofa-1.jpg', alt: 'Hospitality Furniture' } as any,
                },
                {
                    title: 'Office Spaces',
                    items: [{ item: 'Workstations' }, { item: 'Conference & Meeting' }, { item: 'Reception & Waiting Area' }, { item: 'Storage Solutions' }],
                    image: { url: '/media/ergonomic_office_chair_1774243936975.png', alt: 'Office Spaces' } as any,
                },
                {
                    title: 'Residential Furniture',
                    items: [{ item: 'Bedroom' }, { item: 'Living Room' }, { item: 'Dining Room' }, { item: 'Kitchens & Storage' }],
                    image: { url: '/media/bed-1.jpg', alt: 'Residential Furniture' } as any,
                },
            ],
            links: [{ link: { type: 'custom', url: '#', label: 'Book A FREE Consultation' } }],
        },
        {
            blockType: 'howItWorks',
            title: 'How it Works',
            subtitle: "Here's How We Bring Your Dream Space to Life",
            steps: [
                { title: 'Meet Your Designer', description: 'Bring your ideas, inspirations, and budget. Our expert designer will understand your needs and start shaping a plan that fits your lifestyle.', image: { url: '/media/furniture-store-with-different-sofas-and-garden-view-through-the-window.webp', alt: 'Designer' } as any },
                { title: 'Finalize Your Design', description: 'Work one-on-one with your designer to refine the details. Get realistic 3D renders so you can visualize your space before it comes to life.', image: { url: '/media/smart-table.png', alt: 'Design' } as any },
                { title: 'Bring It Home', description: 'Relax while we handle the rest — from crafting to installation. Shop directly from your design with special offers, and watch your dream home come alive.', image: { url: '/media/wardrobe.png', alt: 'Home' } as any },
            ],
            contactText: 'Call Us +91-9314444747',
        },
        {
            blockType: 'customizationOptions',
            title: 'CUSTOMIZATION AVAILABLE',
            subtitle: 'Customize every detail to create interiors that are uniquely yours.',
            options: [
                { title: 'Fabrics', description: 'Choose from 100+ fabrics for every décor style.', image: { url: '/media/sofa-1.png', alt: 'Fabrics' } as any },
                { title: 'Materials', description: 'Choose materials that fit your purpose—solid wood, engineered wood, glass, or mix & match.', image: { url: '/media/wooden_armchair_rustic_1774243797674.png', alt: 'Materials' } as any },
                { title: 'Size', description: 'Get custom and tailor-fit furniture to complement your space.', image: { url: '/media/dining_table_set_1774244119632.png', alt: 'Size' } as any },
            ],
        },
        {
            blockType: 'faqBlock',
            title: 'FREQUENTLY ASKED QUESTIONS',
            description: 'Find Everything From Design Fixes To Expert Tips On Livspace Magazine',
            questions: [
                { question: 'How can I get a bulk quote from Wooden Street?', answer: 'Simply reach out to our team with your requirements. Share your design preferences, order scale, or project details, and our experts will create a tailored quotation for you.' },
                { question: 'Can I customise furniture when ordering in bulk?', answer: 'Yes, we offer complete customization options for bulk orders to match your brand and aesthetic requirements.' },
                { question: 'How long does it take to deliver a bulk order?', answer: 'The timeline varies by project scale, but typically bulk deliveries are scheduled between 45 to 60 days.' },
                { question: 'Does Wooden Street handle corporate or B2B orders?', answer: 'Yes, we cater to large-scale B2B orders for hospitality, corporate offices, and commercial establishments.' },
                { question: 'Do you offer assembly services for bulk orders?', answer: 'Absolutely, free installation and assembly comes standard with our bulk delivery process.' },
                { question: 'Do you provide design consultation for large interior projects?', answer: 'Yes, our experienced 3D designers and interior consultants are part of our bulk order offering.' },
                { question: 'What payment options are available for bulk furniture orders?', answer: 'We offer flexible B2B payment terms, bank transfers, and staged financing depending on the order size.' },
                { question: 'What is the minimum quantity for a bulk furniture order at Wooden Street?', answer: 'Bulk orders typically start from 20 pieces or an overall value of 5 Lakhs, though we offer flexibility based on the items.' },
            ],
        },
    ] as any,
}

export const defaultContactPage: Partial<Page> = {
    title: 'Contact Us',
    hero: {
        type: 'none',
        slides: [
            {
                title: 'Contact Us',
                subTitle: 'GET IN TOUCH',
                richText: {
                    root: {
                        type: 'root',
                        children: [
                            {
                                type: 'paragraph',
                                children: [{ type: 'text', version: 1, text: 'Please configure this page in the Admin Panel.' }],
                                version: 1,
                            },
                        ],
                        direction: 'ltr',
                        format: 'left',
                        indent: 0,
                        version: 1,
                    },
                },
            },
        ],
    } as any,
    layout: [],
}
