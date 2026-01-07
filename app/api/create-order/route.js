import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        const { amount, currency = 'USD', label } = await req.json()

        const apiKey = process.env.ZAPRITE_API_KEY
        if (!apiKey) {
            return NextResponse.json({ error: 'Missing API Key' }, { status: 500 })
        }

        // According to Zaprite API docs for create order
        // https://api.zaprite.com/
        const response = await fetch('https://api.zaprite.com/v1/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                amount: Math.round(amount * 100), // Zaprite expects amount in cents
                currency: currency,
                label: label || 'CalcAI Order',
                // Optional: redirectUrl: 'https://your-site.com/success'
            }),
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error("Zaprite API Error:", errorText)
            return NextResponse.json({ error: 'Failed to create order', details: errorText }, { status: response.status })
        }

        const data = await response.json()
        // data.checkoutUrl or data.id should be returned to form the URL
        // Typical response might include an 'id' or 'checkoutUrl'
        return NextResponse.json(data)
    } catch (error) {
        console.error('Order creation failed:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
