'use client'

import React, { useState, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ScaleIcon } from "lucide-react"

interface PetWeightInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (value: string) => void;
}

const PesoMascotaInput = React.forwardRef<HTMLInputElement, PetWeightInputProps>(
  ({ className, onChange, ...props }, ref) => {
    const [inputValue, setInputValue] = useState('')

    const handleKeyPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
      const char = String.fromCharCode(event.which)
      const regex = /^[0-9.]$/
      if (!regex.test(char)) {
        event.preventDefault()
      }
    }, [])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      const regex = /^(\d{0,3}(\.\d{0,2})?)?$/
      if (regex.test(value)) {
        setInputValue(value)
        onChange?.(value)
      }
    }, [onChange])

    const handlePaste = useCallback((event: React.ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()
      const pastedText = event.clipboardData.getData('text')
      const regex = /^(\d{0,3}(\.\d{0,2})?)?$/
      if (regex.test(pastedText)) {
        setInputValue(pastedText)
        onChange?.(pastedText)
      }
    }, [onChange])

    return (
      <div className="relative">
        <Input
          type="text"
          inputMode="decimal"
          placeholder="Peso de la mascota"
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
          {...props}
          ref={ref}
          className={cn(
            "pl-10 pr-12 text-right",
            className
          )}
        />
        <ScaleIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
          kg
        </span>
      </div>
    )
  }
)

PesoMascotaInput.displayName = 'PesoMascotaInput'

export { PesoMascotaInput }