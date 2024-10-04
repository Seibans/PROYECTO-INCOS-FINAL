import React, { forwardRef, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus } from 'lucide-react'

interface CustomNumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange: (value: number) => void
  min?: number
  max?: number
  step?: number
}

export const CustomNumberInput = forwardRef<HTMLInputElement, CustomNumberInputProps>(
  ({ onValueChange, min = 0, max = Infinity, step = 1, ...props }, ref) => {
    const [inputValue, setInputValue] = useState<string>(props.value?.toString() || '0')

    useEffect(() => {
      setInputValue(props.value?.toString() || '0')
    }, [props.value])

    const handleIncrement = () => {
      const newValue = Math.min(Number(inputValue) + step, max)
      setInputValue(newValue.toString())
      onValueChange(newValue)
    }

    const handleDecrement = () => {
      const newValue = Math.max(Number(inputValue) - step, min)
      setInputValue(newValue.toString())
      onValueChange(newValue)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/[^0-9]/g, '')
      setInputValue(newValue)
      
      if (newValue === '') {
        onValueChange(min)
      } else {
        const numericValue = parseInt(newValue, 10)
        if (!isNaN(numericValue)) {
          onValueChange(Math.max(min, Math.min(numericValue, max)))
        }
      }
    }

    const handleBlur = () => {
      if (inputValue === '') {
        setInputValue(min.toString())
        onValueChange(min)
      }
    }

    return (
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleDecrement} 
          disabled={Number(inputValue) <= min}
          type="button"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          {...props}
          ref={ref}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="w-20 text-center mx-2"
        />
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleIncrement} 
          disabled={Number(inputValue) >= max}
          type="button"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    )
  }
)

CustomNumberInput.displayName = 'CustomNumberInput'