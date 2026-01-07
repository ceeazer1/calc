'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, MapPin } from 'lucide-react'

export default function AddressAutocomplete({ value, onChange, onSelect, placeholder = "Address" }) {
    const [query, setQuery] = useState(value || '')
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const wrapperRef = useRef(null)

    useEffect(() => {
        // Determine if value is external-controlled or local
        if (value !== undefined) {
            setQuery(value)
        }
    }, [value])

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [wrapperRef])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.length > 2 && showSuggestions) {
                fetchAddress(query)
            }
        }, 500)

        return () => clearTimeout(timer)
    }, [query, showSuggestions])

    const fetchAddress = async (searchQuery) => {
        try {
            // Append context to steer results towards addresses in the US
            const q = searchQuery.toLowerCase().includes('usa') ? searchQuery : `${searchQuery}, USA`

            // Removed specific osm_tags to get broader results, we filter manually below
            const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=15`)
            const data = await res.json()

            // Filter for strictly US results
            const usResults = (data.features || [])
                .filter(item => {
                    const p = item.properties
                    return p.countrycode === 'US' || p.country === 'United States'
                })
                .slice(0, 5)

            setSuggestions(usResults)
        } catch (err) {
            console.error("Address fetch error:", err)
        }
    }

    const handleInput = (e) => {
        const val = e.target.value
        setQuery(val)
        onChange && onChange(val)
        if (val.length > 2) setShowSuggestions(true)
        else {
            setSuggestions([])
            setShowSuggestions(false)
        }
    }

    const handleSelect = (feature) => {
        const props = feature.properties

        // Construct nice string
        let addressLabel = [props.housenumber, props.street, props.city, props.state].filter(Boolean).join(', ')
        if (!addressLabel) addressLabel = props.name || props.formatted

        setQuery(addressLabel)

        // Pass detailed info back to parent for auto-fill
        if (onSelect) {
            onSelect({
                address: addressLabel,
                city: props.city,
                state: props.state,
                zip: props.postcode,
                country: 'US'
            })
        } else {
            onChange && onChange(addressLabel)
        }

        setShowSuggestions(false)
    }

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={handleInput}
                    onFocus={() => query.length > 2 && setShowSuggestions(true)}
                    placeholder={placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-zinc-900 border border-white/10 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                    {suggestions.map((item, i) => {
                        const p = item.properties
                        // Logic to construct the main line: e.g. "123 Main St" vs "Empire State Building"
                        let mainLine = p.name
                        if (p.housenumber && p.street) {
                            mainLine = `${p.housenumber} ${p.street}`
                        } else if (p.street) {
                            mainLine = p.street
                        }

                        // Fallback if no specific address info found but name exists
                        if (!mainLine && p.formatted) mainLine = p.formatted.split(',')[0]

                        return (
                            <button
                                key={i}
                                onClick={() => handleSelect(item)}
                                className="w-full text-left px-4 py-3 hover:bg-white/5 flex items-start gap-3 transition-colors border-b border-white/5 last:border-0"
                            >
                                <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                                <div>
                                    <div className="text-sm font-medium text-gray-200">
                                        {mainLine || "Unknown Location"}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {[p.city, p.state, p.country].filter(Boolean).join(', ')}
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                    <div className="px-2 py-1 bg-black/50 text-[10px] text-gray-600 text-center">
                        Powered by OpenStreetMap
                    </div>
                </div>
            )}
        </div>
    )
}
