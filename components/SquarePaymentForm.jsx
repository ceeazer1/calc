import React, { useState } from 'react'
import {
    PaymentForm,
    CreditCard,
    CashAppPay,
    GooglePay,
} from 'react-square-web-payments-sdk'
import { CreditCard as CardIcon, Smartphone, Wallet, CheckCircle2, Circle } from 'lucide-react'

export default function SquarePaymentForm({ amount, onPaymentSuccess, onPaymentError, isFormValid, onDisabledClick, isProcessing }) {
    const [activeMethod, setActiveMethod] = useState('card')
    const [errorMessages, setErrorMessages] = useState([])

    // Helper to handle payment results
    const handleCardTokenization = async (token, buyer) => {
        if (isProcessing) return; // Prevent double trigger

        console.log('Payment Tokenized:', token.token)
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
                    onClick={() => !isProcessing && setActiveMethod(id)}
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
                        <div className="p-4 pt-0 pl-12 relative">
                            {/* Locked overlay for payment buttons */}
                            {(!isFormValid || isProcessing) && (
                                <div
                                    className="absolute inset-0 z-10 cursor-alias"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        if (isProcessing) return;
                                        onDisabledClick && onDisabledClick()
                                    }}
                                />
                            )}
                            <div className={`${(!isFormValid || isProcessing) ? 'form-invalid-blur opacity-90' : ''}`}>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="square-payment-form bg-zinc-900 rounded-xl border border-white/10 overflow-hidden relative">
            {isProcessing && (
                <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4 animate-in fade-in duration-300">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <div className="text-blue-400 font-semibold tracking-wide">Processing Payment...</div>
                </div>
            )}
            <PaymentForm
                applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID || "sandbox-sq0idb-OUBQ3XCxLzgKiUidUUjVLA"}
                locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || "L11JSF1VPW4JW"}
                cardTokenizeResponseReceived={handleCardTokenization}
                key={amount}
                createPaymentRequest={() => ({
                    countryCode: "US",
                    currencyCode: "USD",
                    locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || "L11JSF1VPW4JW",
                    total: {
                        amount: amount.toString(),
                        label: "Total",
                        pending: false
                    }
                })}
                callbacks={{
                    cashAppPay: {
                        onTokenization: (event) => {
                            console.log('Cash App Pay tokenization event:', event);
                            if (event.detail?.tokenResult) {
                                console.log('Token received:', event.detail.tokenResult.token);
                                handleCardTokenization(event.detail.tokenResult);
                            } else {
                                console.error('No token in Cash App Pay response');
                                setErrorMessages(['Failed to complete Cash App payment. Please try again.']);
                            }
                        }
                    }
                }}
                /**
                 * Required for some digital wallet methods that redirect to a new page.
                 */
                overrides={{
                    cashAppPay: {
                        redirectURL: typeof window !== 'undefined' ? window.location.href : undefined
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
                </PaymentMethodItem>

            </PaymentForm>

            {errorMessages.length > 0 && (
                <div className="p-4 bg-red-500/10 border-t border-red-500/20 text-red-400 text-sm">
                    {errorMessages.map((msg, i) => <div key={i}>{msg}</div>)}
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                .form-invalid-blur button, 
                .form-invalid-blur .sq-payment-button, 
                .form-invalid-blur iframe {
                    filter: blur(1.5px) opacity(0.8) !important;
                    pointer-events: none !important;
                }
            `}} />
        </div>
    )
}
