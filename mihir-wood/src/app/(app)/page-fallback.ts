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
        type: 'none',
        richText: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'heading',
                        tag: 'h1',
                        children: [{ type: 'text', version: 1, text: 'Bulk Order Solutions' }],
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
