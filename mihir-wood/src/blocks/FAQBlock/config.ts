import type { Block } from 'payload'

export const FAQBlock: Block = {
    slug: 'faqBlock',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'FREQUENTLY ASKED QUESTIONS',
        },
        {
            name: 'description',
            type: 'textarea',
            defaultValue: 'Find Everything From Design Fixes To Expert Tips On Livspace Magazine',
        },
        {
            name: 'questions',
            type: 'array',
            minRows: 1,
            maxRows: 20,
            fields: [
                {
                    name: 'question',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'answer',
                    type: 'textarea',
                    required: true,
                },
            ],
        },
    ],
    interfaceName: 'FAQBlockConfig',
}
