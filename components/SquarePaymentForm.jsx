'use client'

import React, { useState } from 'react'
import {
    PaymentForm,
    CreditCard,
    CashAppPay,
    GooglePay,
    ApplePay,
} from 'react-square-web-payments-sdk'

export default function SquarePaymentForm({ amount, activeMethod, onPaymentSuccess, onPaymentError }) {
    const [errorMessages, setErrorMessages] = useState([])

    // Helper to handle payment results
    const handleCardTokenization = async (token, buyer) => {
        // In a real app, you send this token to your backend to charge the card
        // Example: await fetch('/api/pay', { body: JSON.stringify({ token: token.token }) })
        console.log('Payment Token:', token)
        console.log('Buyer:', buyer)
        if (token.status === 'OK') {
            onPaymentSuccess && onPaymentSuccess(token)
        } else {
            setErrorMessages(['Payment failed. Please try again.'])
            onPaymentError && onPaymentError(token)
        }
    }

    return (
        <div className="square-payment-form bg-zinc-900 rounded-xl p-6 border border-white/10">
            <PaymentForm
                /**
                 * Identifies the calling application's Square account.
                 * Replace these with your actual Application ID and Location ID
                 * or pass them as props/env vars.
                 */
                applicationId="sandbox-sq0idb-OUBQ3XCxLzgKiUidUUjVLA"
                locationId="L11JSF1VPW4JW"
                cardTokenizeResponseReceived={handleCardTokenization}
                // Force re-render when amount changes so digital wallets update the total
                key={amount}

                // Configuration for Digital Wallets (Apple/Google Pay)
                createPaymentRequest={() => ({
                    countryCode: "US",
                    currencyCode: "USD",
                    total: {
                        amount: amount.toString(),
                        label: "Total",
                        pending: false
                    }
                })}

                // Configuration for Cash App
                callbacks={{
                    cashAppPay: {
                        onTokenization: (event) => {
                            console.log("Cash App Tokenization:", event)
                            handleCardTokenization(event.detail.tokenResult)
                        }
                    }
                }}
            >
                <div className="space-y-6">
                    {/* Cash App Pay */}
                    {activeMethod === 'cashapp' && (
                        <div className="mb-4 animate-in fade-in zoom-in duration-300">
                            <div className="mb-2 text-center text-sm text-gray-400 font-medium">Click below to pay with Cash App</div>
                            <CashAppPay />
                        </div>
                    )}

                    {/* Google Pay / Apple Pay */}
                    {activeMethod === 'googlepay' && (
                        <div className="mb-4 animate-in fade-in zoom-in duration-300">
                            <div className="mb-2 text-center text-sm text-gray-400 font-medium">Click below to pay with Google Pay</div>
                            <GooglePay />
                            {/* Apple Pay automatically hides if not supported, but we can group them here if desired. 
                                Typically users on Apple devices might see proper Apple Pay buttons instead of Google Pay 
                                depending on browser support, but Square's SDK handles display logic. 
                            */}
                            <div className="mt-4">
                                <ApplePay />
                            </div>
                        </div>
                    )}

                    {/* Credit Card Form */}
                    {activeMethod === 'card' && (
                        <div className="animate-in fade-in zoom-in duration-300">
                            <div className="mb-4 text-sm text-gray-400 font-medium">Enter card details</div>
                            <CreditCard
                                buttonProps={{
                                    css: {
                                        backgroundColor: "#2563eb",
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor: "#1d4ed8",
                                        },
                                    }
                                }}
                                style={{
                                    input: {
                                        fontSize: '16px',
                                        color: '#fff',
                                        backgroundColor: 'transparent',
                                    },
                                    'input::placeholder': {
                                        color: '#a1a1aa',
                                    },
                                }}
                            />
                        </div>
                    )}
                </div>
            </PaymentForm>

            {errorMessages.length > 0 && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
                    {errorMessages.map((msg, i) => <div key={i}>{msg}</div>)}
                </div>
            )}
        </div>
    )
}
