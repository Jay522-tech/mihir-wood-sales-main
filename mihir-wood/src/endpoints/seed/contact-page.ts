import type { Form } from '@/payload-types'

import { RequiredDataFromCollectionSlug } from 'payload'

type ProductArgs = {
  contactForm: Form
}

export const contactPageData: (args: ProductArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  contactForm,
}) => {
  return {
    slug: 'contact',
    _status: 'published',
    hero: {
      type: 'none',
    },
    layout: [
      {
        blockType: 'brandHeritage',
        title: 'A Journey of Hard Work & Passion.',
        subtitle: 'BRAND HERITAGE',
        chapters: [
          {
            title: 'The Foundation',
            content: 'Mihir Wood Sale was built on hard work, persistence, and a deep passion for woodworking. The foundation began when our founder left his village and came to Rajkot in search of opportunity. His journey started with small jobs, including packing chocolate boxes at a local factory.',
          },
          {
            title: 'The Spark of Craftsmanship',
            content: 'The real opportunity came when he joined one of the largest sawmills in Rajkot. Developed a strong interest in wood, his curiosity slowly turned into skill and experience. After years of learning, he took a bold step and started a small woodworking shop of his own.',
          },
          {
            title: 'Expansion & Growth',
            content: 'With dedication, the workshop grew steadily, eventually expanding into sawmill operations. This vertical integration allowed us to control wood supply and improve manufacturing capabilities, leading to the production of handcrafted wooden temples and premium furniture.',
          },
          {
            title: 'The Next Generation',
            content: 'In 2017, the next generation joined, learning the craft from the ground up. The 2019–2020 period became a turning point, allowing them to fully step into the business, mastering machinery and manual processes even during slower times.',
          },
          {
            title: 'Modern Excellence',
            content: 'Today, Mihir Wood Sale has expanded into handcrafted carved furniture and custom wooden solutions. Serving hotel chains, resorts, and luxury residences, we remain rooted in our original values: hard work, craftsmanship, and an unwavering dedication to quality.',
          },
        ],
      } as any,
      {
        blockType: 'inquirySection',
        title: 'HAVE SOMETHING IN MIND?',
        description: 'Whether it is a custom furniture piece for your home or a large-scale project for your business, we are here to help.',
        variant: 'simple',
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14767.43615438883!2d70.784561!3d22.2847118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca196580983d%3A0x399859f77f52ca3!2sMihir%20Wood%20Sale!5e0!3m2!1sen!2sin!4v1711974797089!5m2!1sen!2sin",
      } as any,
      {
        blockType: 'contactInfoGrid',
        items: [
          {
            icon: 'phone',
            label: 'MOBILE NUMBER',
            content: '+91 93134 05709',
          },
          {
            icon: 'map-pin',
            label: 'STUDIO ADDRESS',
            content: '123 SG Highway, \n Ahmedabad, Gujarat 380001',
          },
          {
            icon: 'clock',
            label: 'SHOP TIMING',
            content: 'Mon - Sat \n 10:00 AM - 08:00 PM',
          },
        ],
      } as any,
    ],
    title: 'Contact',
  }
}
