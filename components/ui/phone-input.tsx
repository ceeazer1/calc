"use client";

import * as React from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Phone, CheckCircle, XCircle } from "lucide-react";
import { AsYouType, parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const DEFAULT_ALLOWED_COUNTRIES: CountryCode[] = ["US"];

function flagSrc(countryCode: string) {
    return `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;
}

// Country data with phone codes, patterns, and placeholders
const countries = [
    {
        code: "US",
        name: "United States",
        phoneCode: "+1",
        placeholder: "(555) 123-4567",
        pattern: /^(\([0-9]{3}\))\s?[0-9]{3}-?[0-9]{4}$/,
        maxLength: 14,
    },
    {
        code: "GB",
        name: "United Kingdom",
        phoneCode: "+44",
        placeholder: "7911 123456",
        pattern: /^[0-9]{10,11}$/,
        maxLength: 11,
    },
    {
        code: "CA",
        name: "Canada",
        phoneCode: "+1",
        placeholder: "(555) 123-4567",
        pattern: /^(\([0-9]{3}\))\s?[0-9]{3}-?[0-9]{4}$/,
        maxLength: 14,
    },
    {
        code: "AU",
        name: "Australia",
        phoneCode: "+61",
        placeholder: "412 345 678",
        pattern: /^[0-9]{9,10}$/,
        maxLength: 11,
    },
    {
        code: "DE",
        name: "Germany",
        phoneCode: "+49",
        placeholder: "151 12345678",
        pattern: /^[0-9]{10,12}$/,
        maxLength: 12,
    },
    {
        code: "FR",
        name: "France",
        phoneCode: "+33",
        placeholder: "6 12 34 56 78",
        pattern: /^[0-9]{10}$/,
        maxLength: 12,
    },
    {
        code: "IT",
        name: "Italy",
        phoneCode: "+39",
        placeholder: "312 345 6789",
        pattern: /^[0-9]{9,10}$/,
        maxLength: 11,
    },
    {
        code: "ES",
        name: "Spain",
        phoneCode: "+34",
        placeholder: "612 34 56 78",
        pattern: /^[0-9]{9}$/,
        maxLength: 11,
    },
    {
        code: "NL",
        name: "Netherlands",
        phoneCode: "+31",
        placeholder: "6 12345678",
        pattern: /^[0-9]{9}$/,
        maxLength: 10,
    },
    {
        code: "BE",
        name: "Belgium",
        phoneCode: "+32",
        placeholder: "470 12 34 56",
        pattern: /^[0-9]{9}$/,
        maxLength: 11,
    },
    {
        code: "CH",
        name: "Switzerland",
        phoneCode: "+41",
        placeholder: "78 123 45 67",
        pattern: /^[0-9]{9}$/,
        maxLength: 11,
    },
    {
        code: "AT",
        name: "Austria",
        phoneCode: "+43",
        placeholder: "664 123456",
        pattern: /^[0-9]{10,11}$/,
        maxLength: 12,
    },
    {
        code: "SE",
        name: "Sweden",
        phoneCode: "+46",
        placeholder: "70 123 45 67",
        pattern: /^[0-9]{9}$/,
        maxLength: 11,
    },
    {
        code: "NO",
        name: "Norway",
        phoneCode: "+47",
        placeholder: "412 34 567",
        pattern: /^[0-9]{8}$/,
        maxLength: 8,
    },
    {
        code: "DK",
        name: "Denmark",
        phoneCode: "+45",
        placeholder: "20 12 34 56",
        pattern: /^[0-9]{8}$/,
        maxLength: 8,
    },
    {
        code: "FI",
        name: "Finland",
        phoneCode: "+358",
        placeholder: "50 123 4567",
        pattern: /^[0-9]{9,10}$/,
        maxLength: 11,
    },
    {
        code: "PL",
        name: "Poland",
        phoneCode: "+48",
        placeholder: "512 123 456",
        pattern: /^[0-9]{9}$/,
        maxLength: 11,
    },
    {
        code: "CZ",
        name: "Czech Republic",
        phoneCode: "+420",
        placeholder: "601 123 456",
        pattern: /^[0-9]{9}$/,
        maxLength: 9,
    },
    {
        code: "HU",
        name: "Hungary",
        phoneCode: "+36",
        placeholder: "20 123 4567",
        pattern: /^[0-9]{8,9}$/,
        maxLength: 10,
    },
    {
        code: "PT",
        name: "Portugal",
        phoneCode: "+351",
        placeholder: "912 345 678",
        pattern: /^[0-9]{9}$/,
        maxLength: 9,
    },
    {
        code: "GR",
        name: "Greece",
        phoneCode: "+30",
        placeholder: "694 123 4567",
        pattern: /^[0-9]{10}$/,
        maxLength: 10,
    },
    {
        code: "TR",
        name: "Turkey",
        phoneCode: "+90",
        placeholder: "532 123 45 67",
        pattern: /^[0-9]{10}$/,
        maxLength: 12,
    },
    {
        code: "RU",
        name: "Russia",
        phoneCode: "+7",
        placeholder: "912 123-45-67",
        pattern: /^[0-9]{10}$/,
        maxLength: 12,
    },
    {
        code: "JP",
        name: "Japan",
        phoneCode: "+81",
        placeholder: "90 1234 5678",
        pattern: /^[0-9]{10,11}$/,
        maxLength: 13,
    },
    {
        code: "KR",
        name: "South Korea",
        phoneCode: "+82",
        placeholder: "10 1234 5678",
        pattern: /^[0-9]{10,11}$/,
        maxLength: 13,
    },
    {
        code: "CN",
        name: "China",
        phoneCode: "+86",
        placeholder: "138 0013 8000",
        pattern: /^[0-9]{11}$/,
        maxLength: 13,
    },
    {
        code: "IN",
        name: "India",
        phoneCode: "+91",
        placeholder: "98765 43210",
        pattern: /^[0-9]{10}$/,
        maxLength: 11,
    },
    {
        code: "SG",
        name: "Singapore",
        phoneCode: "+65",
        placeholder: "8123 4567",
        pattern: /^[0-9]{8}$/,
        maxLength: 8,
    },
    {
        code: "MY",
        name: "Malaysia",
        phoneCode: "+60",
        placeholder: "12-345 6789",
        pattern: /^[0-9]{9,10}$/,
        maxLength: 12,
    },
    {
        code: "TH",
        name: "Thailand",
        phoneCode: "+66",
        placeholder: "81 234 5678",
        pattern: /^[0-9]{9}$/,
        maxLength: 11,
    },
    {
        code: "ID",
        name: "Indonesia",
        phoneCode: "+62",
        placeholder: "812-3456-789",
        pattern: /^[0-9]{9,13}$/,
        maxLength: 15,
    },
    {
        code: "PH",
        name: "Philippines",
        phoneCode: "+63",
        placeholder: "917 123 4567",
        pattern: /^[0-9]{10}$/,
        maxLength: 12,
    },
    {
        code: "VN",
        name: "Vietnam",
        phoneCode: "+84",
        placeholder: "91 234 56 78",
        pattern: /^[0-9]{9,10}$/,
        maxLength: 12,
    },
    {
        code: "BD",
        name: "Bangladesh",
        phoneCode: "+880",
        placeholder: "1712-345678",
        pattern: /^[0-9]{10,11}$/,
        maxLength: 13,
    },
    {
        code: "PK",
        name: "Pakistan",
        phoneCode: "+92",
        placeholder: "301 2345678",
        pattern: /^[0-9]{10}$/,
        maxLength: 12,
    },
    {
        code: "LK",
        name: "Sri Lanka",
        phoneCode: "+94",
        placeholder: "71 234 5678",
        pattern: /^[0-9]{9}$/,
        maxLength: 10,
    },
    {
        code: "AE",
        name: "United Arab Emirates",
        phoneCode: "+971",
        placeholder: "50 123 4567",
        pattern: /^[0-9]{9}$/,
        maxLength: 9,
    },
    {
        code: "SA",
        name: "Saudi Arabia",
        phoneCode: "+966",
        placeholder: "50 123 4567",
        pattern: /^[0-9]{9}$/,
        maxLength: 9,
    },
    {
        code: "IL",
        name: "Israel",
        phoneCode: "+972",
        placeholder: "50-123-4567",
        pattern: /^[0-9]{9}$/,
        maxLength: 11,
    },
    {
        code: "EG",
        name: "Egypt",
        phoneCode: "+20",
        placeholder: "10 1234 5678",
        pattern: /^[0-9]{10}$/,
        maxLength: 12,
    },
    {
        code: "ZA",
        name: "South Africa",
        phoneCode: "+27",
        placeholder: "82 123 4567",
        pattern: /^[0-9]{9}$/,
        maxLength: 10,
    },
    {
        code: "NG",
        name: "Nigeria",
        phoneCode: "+234",
        placeholder: "802 123 4567",
        pattern: /^[0-9]{10}$/,
        maxLength: 10,
    },
    {
        code: "KE",
        name: "Kenya",
        phoneCode: "+254",
        placeholder: "712 123456",
        pattern: /^[0-9]{9}$/,
        maxLength: 9,
    },
    {
        code: "GH",
        name: "Ghana",
        phoneCode: "+233",
        placeholder: "23 123 4567",
        pattern: /^[0-9]{9}$/,
        maxLength: 10,
    },
    {
        code: "BR",
        name: "Brazil",
        phoneCode: "+55",
        placeholder: "(11) 91234-5678",
        pattern: /^[0-9]{10,11}$/,
        maxLength: 15,
    },
    {
        code: "MX",
        name: "Mexico",
        phoneCode: "+52",
        placeholder: "55 1234 5678",
        pattern: /^[0-9]{10}$/,
        maxLength: 12,
    },
    {
        code: "AR",
        name: "Argentina",
        phoneCode: "+54",
        placeholder: "9 11 1234-5678",
        pattern: /^[0-9]{10,11}$/,
        maxLength: 14,
    },
    {
        code: "CL",
        name: "Chile",
        phoneCode: "+56",
        placeholder: "9 8765 4321",
        pattern: /^[0-9]{9}$/,
        maxLength: 11,
    },
    {
        code: "CO",
        name: "Colombia",
        phoneCode: "+57",
        placeholder: "321 1234567",
        pattern: /^[0-9]{10}$/,
        maxLength: 12,
    },
    {
        code: "PE",
        name: "Peru",
        phoneCode: "+51",
        placeholder: "987 654 321",
        pattern: /^[0-9]{9}$/,
        maxLength: 11,
    },
    {
        code: "VE",
        name: "Venezuela",
        phoneCode: "+58",
        placeholder: "412-1234567",
        pattern: /^[0-9]{10}$/,
        maxLength: 12,
    },
    {
        code: "UY",
        name: "Uruguay",
        phoneCode: "+598",
        placeholder: "91 123 456",
        pattern: /^[0-9]{8}$/,
        maxLength: 8,
    },
].sort((a, b) => a.name.localeCompare(b.name));

// Phone validation utility
const validatePhoneNumber = (
    phoneNumber: string,
    countryCode: string
): boolean => {
    const raw = String(phoneNumber || "").trim();
    if (!raw) return false;

    const cleaned = raw.replace(/[^\d+]/g, "");
    const parsed = cleaned.startsWith("+")
        ? parsePhoneNumberFromString(cleaned)
        : parsePhoneNumberFromString(cleaned, countryCode as CountryCode);

    return parsed?.isValid() ?? false;
};

const phoneInputVariants = cva(
    "flex w-full items-center gap-2 bg-transparent text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "",
                outline: "",
                ghost: "",
            },
            size: {
                sm: "h-7 sm:h-8 px-2 text-xs",
                default: "h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm",
                lg: "h-12 sm:h-10 px-3 sm:px-4 text-sm",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface PhoneInputProps
    extends VariantProps<typeof phoneInputVariants> {
    value?: string;
    allowedCountries?: string[];
    onChange?: (
        value: string,
        formattedValue: string,
        countryCode: string,
        isValid?: boolean
    ) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    defaultCountry?: string;
    showFlag?: boolean;
    showIcon?: boolean;
    error?: boolean;
    showValidation?: boolean;
    onValidationChange?: (isValid: boolean) => void;
}

export function PhoneInput({
    value = "",
    allowedCountries,
    onChange,
    placeholder,
    className,
    disabled = false,
    defaultCountry = "US",
    showFlag = true,
    showIcon = true,
    error = false,
    showValidation = false,
    onValidationChange,
    variant,
    size,
    ...props
}: PhoneInputProps) {
    const availableCountries = React.useMemo(() => {
        const rawAllowed =
            allowedCountries && allowedCountries.length > 0
                ? allowedCountries
                : DEFAULT_ALLOWED_COUNTRIES;
        const allowed = new Set(rawAllowed.map((c) => String(c).toUpperCase()));
        return countries.filter((c) => allowed.has(c.code));
    }, [allowedCountries]);

    const [selectedCountry, setSelectedCountry] = React.useState(() => {
        const preferred =
            availableCountries.find((c) => c.code === defaultCountry) ||
            availableCountries[0];
        return preferred || countries.find((c) => c.code === defaultCountry) || countries[0];
    });
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [isValid, setIsValid] = React.useState(false);

    // Use country-specific placeholder if none provided
    const effectivePlaceholder = placeholder || selectedCountry.placeholder;

    React.useEffect(() => {
        // Keep the selected country consistent with allowedCountries/defaultCountry.
        if (!availableCountries.some((c) => c.code === selectedCountry.code)) {
            const next =
                availableCountries.find((c) => c.code === defaultCountry) ||
                availableCountries[0] ||
                countries.find((c) => c.code === defaultCountry) ||
                countries[0];
            setSelectedCountry(next);
        }
    }, [availableCountries, defaultCountry, selectedCountry.code]);

    React.useEffect(() => {
        const s = String(value || "").trim();
        if (!s) {
            setPhoneNumber("");
            return;
        }

        // If value is E.164, detect country automatically.
        const cleaned = s.replace(/[^\d+]/g, "");
        const parsed = cleaned.startsWith("+")
            ? parsePhoneNumberFromString(cleaned)
            : parsePhoneNumberFromString(cleaned, selectedCountry.code as CountryCode);

        if (parsed) {
            const parsedCountry = parsed.country;
            if (parsedCountry) {
                const match =
                    availableCountries.find((c) => c.code === parsedCountry) ||
                    countries.find((c) => c.code === parsedCountry);
                if (match) setSelectedCountry(match);
            }
            setPhoneNumber(parsed.formatNational());
            return;
        }

        // Fallback: format whatever digits we have for the currently selected country.
        const digits = cleaned.replace(/\D/g, "");
        const ayt = new AsYouType(selectedCountry.code as CountryCode);
        setPhoneNumber(ayt.input(digits));
    }, [value]);

    // Validate phone number whenever it changes
    React.useEffect(() => {
        const valid =
            phoneNumber.length > 0
                ? validatePhoneNumber(phoneNumber, selectedCountry.code)
                : false;
        setIsValid(valid);
        onValidationChange?.(valid);
    }, [phoneNumber, selectedCountry.code, onValidationChange]);

    const handleCountryChange = (countryCode: string) => {
        const country =
            availableCountries.find((c) => c.code === countryCode) ||
            countries.find((c) => c.code === countryCode);
        if (country) {
            setSelectedCountry(country);

            const digits = String(phoneNumber || "").replace(/\D/g, "");
            const ayt = new AsYouType(country.code as CountryCode);
            const formattedNational = digits ? ayt.input(digits) : "";
            setPhoneNumber(formattedNational);

            const parsed = digits
                ? parsePhoneNumberFromString(digits, country.code as CountryCode)
                : undefined;
            const e164 = digits ? (parsed?.number || `${country.phoneCode}${digits}`) : "";
            const valid = parsed?.isValid() ?? false;
            onChange?.(formattedNational, e164, country.code, valid);
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = String(e.target.value || "").trim();
        const cleaned = raw.replace(/[^\d+]/g, "");

        // Allow pasting full E.164 (e.g. +14155551234).
        if (cleaned.startsWith("+")) {
            const parsed = parsePhoneNumberFromString(cleaned);
            if (parsed) {
                const parsedCountry = parsed.country;
                const match =
                    (parsedCountry &&
                        (availableCountries.find((c) => c.code === parsedCountry) ||
                            countries.find((c) => c.code === parsedCountry))) ||
                    selectedCountry;
                if (match.code !== selectedCountry.code) setSelectedCountry(match);

                const national = parsed.formatNational();
                setPhoneNumber(national);
                onChange?.(national, parsed.number, match.code, parsed.isValid());
                return;
            }
        }

        const digits = cleaned.replace(/\D/g, "");
        const ayt = new AsYouType(selectedCountry.code as CountryCode);
        const formattedNational = digits ? ayt.input(digits) : "";
        setPhoneNumber(formattedNational);

        const parsed = digits
            ? parsePhoneNumberFromString(digits, selectedCountry.code as CountryCode)
            : undefined;
        const e164 = digits
            ? parsed?.number || `${selectedCountry.phoneCode}${digits}`
            : "";
        const valid = parsed?.isValid() ?? false;
        onChange?.(formattedNational, e164, selectedCountry.code, valid);
    };

    return (
        <div
            className={cn(phoneInputVariants({ variant, size }), className)}
            {...props}
        >
            {showIcon && <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />}

            <div className="flex items-center gap-1 shrink-0">
                <Select
                    value={selectedCountry.code}
                    onValueChange={handleCountryChange}
                    disabled={disabled || availableCountries.length <= 1}
                >
                    <SelectTrigger className="h-auto border-none bg-transparent p-0 shadow-none focus:ring-0 focus-visible:ring-transparent focus-visible:border-transparent focus-visible:outline-transparent active:ring-transparent active:border-transparent active:outline-transparent focus:ring-transparent focus:border-transparent focus:outline-transparent">
                        <SelectValue>
                            <div className="flex items-center gap-1">
                                {showFlag && (
                                    <Image
                                        src={flagSrc(selectedCountry.code)}
                                        alt={`${selectedCountry.name} flag`}
                                        width={20}
                                        height={15}
                                        className="rounded-sm"
                                    />
                                )}
                                <span className="text-xs text-muted-foreground">
                                    {selectedCountry.phoneCode}
                                </span>
                            </div>
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                        {availableCountries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={flagSrc(country.code)}
                                        alt={`${country.name} flag`}
                                        width={20}
                                        height={15}
                                        className="rounded-sm"
                                    />
                                    <span className="font-medium">{country.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {country.phoneCode}
                                    </span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder={effectivePlaceholder}
                disabled={disabled}
                className={cn(
                    "border-none bg-transparent p-0 shadow-none focus-visible:ring-transparent focus-visible:border-transparent focus-visible:outline-transparent",
                    showValidation &&
                    phoneNumber.length > 0 &&
                    (isValid ? "text-green-600" : "text-red-600")
                )}
            />

            {showValidation && phoneNumber.length > 0 && (
                <div className="ml-auto shrink-0">
                    {isValid ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                    )}
                </div>
            )}
        </div>
    );
}
