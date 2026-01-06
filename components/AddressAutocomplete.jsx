'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, MapPin } from 'lucide-react'

export default function AddressAutocomplete({ value, onChange, placeholder = "Address" }) {
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

    const handleInput = async (e) => {
        const val = e.target.value
        setQuery(val)
        onChange && onChange(val) // Propagate raw value

        if (val.length > 2) {
            try {
                // Using Photon (OpenStreetMap) API for free address autocomplete
                const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(val)}&limit=5`)
                const data = await res.json()
                setSuggestions(data.features || [])
                setShowSuggestions(true)
            } catch (err) {
                console.error("Address fetch error:", err)
            }
        } else {
            setSuggestions([])
            setShowSuggestions(false)
        }
    }

    const handleSelect = (feature) => {
        const props = feature.properties
        // Construct a nice string: Street, City, Country
        let address = [props.name, props.street, props.city, props.state, props.country]
            .filter(Boolean)
            .join(', ')

        // Some entries might be weird, so we fallback
        if (!props.street && !props.city) {
            address = props.name || props.formatted
        }

        setQuery(address)
        onChange && onChange(address)
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
                    {suggestions.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => handleSelect(item)}
                            className="w-full text-left px-4 py-3 hover:bg-white/5 flex items-start gap-3 transition-colors border-b border-white/5 last:border-0"
                        >
                            <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                            <div>
                                <div className="text-sm font-medium text-gray-200">
                                    {item.properties.name || item.properties.street || "Unknown"}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {[item.properties.city, item.properties.state, item.properties.country].filter(Boolean).join(', ')}
                                </div>
                            </div>
                        </button>
                    ))}
                    <div className="px-2 py-1 bg-black/50 text-[10px] text-gray-600 text-center">
                        Powered by OpenStreetMap
                    </div>
                </div>
            )}
        </div>
    )
}
