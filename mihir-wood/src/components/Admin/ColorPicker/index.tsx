'use client'
import React, { useState, useRef, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import { useField } from '@payloadcms/ui'
import './index.css'

export const ColorPicker: React.FC<{ path: string; label?: string | { [key: string]: string }; required?: boolean }> = ({ path, label, required }) => {
    const { value, setValue } = useField<string>({ path })
    const [showPicker, setShowPicker] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Format label if it's an object (translations)
    const displayLabel = typeof label === 'object' ? label.en || Object.values(label)[0] : label

    // Close picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowPicker(false)
            }
        }

        if (showPicker) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showPicker])

    const handleColorChange = (newColor: string) => {
        const normalizedColor = newColor.toLowerCase()
        if (normalizedColor !== (value?.toLowerCase() || '')) {
            setValue(normalizedColor)
        }
    }

    return (
        <div className="field-type color-picker-field" ref={containerRef}>
            <div className="label-wrapper">
                <label className="field-label">
                    {displayLabel || path.split('.').pop()?.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    {required && <span className="required">*</span>}
                </label>
            </div>
            <div className="color-picker-container">
                <div className="color-input-wrapper" onClick={() => setShowPicker(!showPicker)}>
                    <div
                        className="color-swatch"
                        style={{
                            backgroundColor: value || '#ffffff',
                        }}
                    />
                    <input
                        className="color-input"
                        type="text"
                        value={value || ''}
                        onChange={(e) => handleColorChange(e.target.value)}
                        placeholder="#ffffff"
                        readOnly
                    />
                </div>
                {showPicker && (
                    <div className="picker-popover">
                        <HexColorPicker color={value || '#ffffff'} onChange={handleColorChange} />
                    </div>
                )}
            </div>
        </div>
    )
}
