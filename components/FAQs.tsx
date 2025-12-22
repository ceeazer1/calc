'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQs() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'How long does shipping take?',
            answer: 'Standard shipping takes 3-5 business days, depending on your location. Express shipping options are available at checkout for 1-2 business day delivery.',
        },
        {
            id: 'item-2',
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. For enterprise customers, we also offer invoicing options.',
        },
        {
            id: 'item-3',
            question: 'Can I change or cancel my order?',
            answer: 'You can modify or cancel your order within 1 hour of placing it. After this window, please contact our customer support team who will assist you with any changes.',
        },
        {
            id: 'item-4',
            question: 'Do you ship internationally?',
            answer: "No, we currently do not offer international shipping. We only ship to addresses within the United States.",
        },
        {
            id: 'item-5',
            question: 'What is your return policy?',
            answer: 'We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Some specialty items may have different return terms, which will be noted on the product page.',
        },
    ]

    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-6">
                <div className="space-y-12">
                    <h2 className="text-white text-center text-4xl font-light tracking-tight">Your questions answered</h2>

                    <Accordion
                        type="single"
                        collapsible
                        className="-mx-2 sm:mx-0">
                        {faqItems.map((item) => (
                            <div
                                className="group"
                                key={item.id}>
                                <AccordionItem
                                    value={item.id}
                                    className="data-[state=open]:bg-white/5 peer rounded-xl border-none px-5 py-1 data-[state=open]:border-none md:px-7">
                                    <AccordionTrigger className="cursor-pointer text-base hover:no-underline text-white font-light tracking-tight">{item.question}</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-base text-gray-400 font-light tracking-tight font-light">{item.answer}</p>
                                    </AccordionContent>
                                </AccordionItem>
                                <hr className="mx-5 -mb-px group-last:hidden peer-data-[state=open]:opacity-0 md:mx-7 border-white/5" />
                            </div>
                        ))}
                    </Accordion>

                    <p className="text-gray-400 text-center font-light tracking-tight">
                        Can&apos;t find what you&apos;re looking for? Contact our{' '}
                        <Link
                            href="/community"
                            className="text-blue-400 font-medium hover:underline">
                            customer support team
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
