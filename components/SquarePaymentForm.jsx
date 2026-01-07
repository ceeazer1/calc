import React, { useState } from 'react'
import {
    PaymentForm,
    CreditCard,
    CashAppPay,
    GooglePay,
    ApplePay,
} from 'react-square-web-payments-sdk'
import { CreditCard as CardIcon, Smartphone, Wallet, CheckCircle2, Circle } from 'lucide-react'

export default function SquarePaymentForm({ amount, onPaymentSuccess, onPaymentError }) {
    const [activeMethod, setActiveMethod] = useState('card')
    const [errorMessages, setErrorMessages] = useState([])

    // Helper to handle payment results
    const handleCardTokenization = async (token, buyer) => {
        console.log('Payment Token:', token)
        console.log('Buyer:', buyer)
        if (token.status === 'OK') {
            onPaymentSuccess && onPaymentSuccess(token)
        } else {
            setErrorMessages(['Payment failed. Please try again.'])
            onPaymentError && onPaymentError(token)
        }
    }

    const PaymentMethodItem = ({ id, label, icon: Icon, children, showBrands }) => {
        const isActive = activeMethod === id
        return (
            <div
                className={`border-b border-white/10 last:border-0 transition-colors ${isActive ? 'bg-white/5' : 'hover:bg-white/[0.02]'}`}
            >
                <div
                    className="flex items-center gap-4 p-4 cursor-pointer"
                    onClick={() => setActiveMethod(id)}
                >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isActive ? 'border-blue-500 text-blue-500' : 'border-gray-500 text-transparent'}`}>
                        <div className={`w-2.5 h-2.5 rounded-full bg-current ${isActive ? 'scale-100' : 'scale-0'} transition-transform`} />
                    </div>

                    <div className="flex items-center gap-3 flex-1">
                        <Icon className="w-5 h-5 text-gray-400" />
                        <span className="font-medium text-white">{label}</span>
                    </div>

                    {showBrands && (
                        <div className="flex gap-1">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-5 bg-white/10 rounded sm:block hidden" />
                            ))}
                        </div>
                    )}
                </div>

                <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                    <div className="overflow-hidden">
                        <div className="p-4 pt-0 pl-12">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="square-payment-form bg-zinc-900 rounded-xl border border-white/10 overflow-hidden">
            <PaymentForm
                applicationId="sandbox-sq0idb-OUBQ3XCxLzgKiUidUUjVLA"
                locationId="L11JSF1VPW4JW"
                cardTokenizeResponseReceived={handleCardTokenization}
                key={amount}
                createPaymentRequest={() => ({
                    countryCode: "US",
                    currencyCode: "USD",
                    total: {
                        amount: amount.toString(),
                        label: "Total",
                        pending: false
                    }
                })}
                callbacks={{
                    cashAppPay: {
                        onTokenization: (event) => handleCardTokenization(event.detail.tokenResult)
                    }
                }}
            >
                {/* Credit Card Section */}
                <PaymentMethodItem
                    id="card"
                    label="Credit or Debit Card"
                    icon={CardIcon}
                    showBrands
                >
                    <CreditCard
                        buttonProps={{
                            css: {
                                backgroundColor: "#2563eb",
                                fontSize: "16px",
                                fontWeight: "600",
                                color: "#fff",
                                "&:hover": { backgroundColor: "#1d4ed8" },
                            }
                        }}
                        style={{
                            input: {
                                fontSize: '16px',
                                color: '#fff',
                                backgroundColor: 'transparent',
                            },
                            'input::placeholder': { color: '#a1a1aa' },
                        }}
                    />
                </PaymentMethodItem>

                {/* Cash App Section */}
                <PaymentMethodItem id="cashapp" label="Cash App Pay" icon={Wallet}>
                    <div className="text-sm text-gray-400 mb-4">
                        Scan the QR code or log in to pay with Cash App.
                    </div>
                    <CashAppPay />
                </PaymentMethodItem>

                {/* Google Pay Section */}
                <PaymentMethodItem id="googlepay" label="Google Pay" icon={Smartphone}>
                    <GooglePay />
                    <div className="mt-2 h-0 opacity-0 overflow-hidden">
                        <ApplePay />
                    </div>
                </PaymentMethodItem>

            </PaymentForm>

            {errorMessages.length > 0 && (
                <div className="p-4 bg-red-500/10 border-t border-red-500/20 text-red-400 text-sm">
                    {errorMessages.map((msg, i) => <div key={i}>{msg}</div>)}
                </div>
            )}
        </div>
    )
}
