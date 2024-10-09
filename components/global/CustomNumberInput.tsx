import React, { forwardRef, useEffect, useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus } from 'lucide-react'

interface CustomNumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onValueChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  lecture?: boolean
}

export const CustomNumberInput = forwardRef<HTMLInputElement, CustomNumberInputProps>(
  ({ onValueChange, min = 0, max = Infinity, step = 1, lecture = false, ...props }, ref) => {
    const [inputValue, setInputValue] = useState<string>(props.value?.toString() || '0')

    useEffect(() => {
      setInputValue(props.value?.toString() || '0')
    }, [props.value])

    const clampValue = useCallback((value: number): number => {
      return Math.max(min, Math.min(value, max))
    }, [min, max])

    const handleIncrement = () => {
      const newValue = clampValue(Number(inputValue) + step)
      setInputValue(newValue.toString())
      onValueChange(newValue)
    }

    const handleDecrement = () => {
      const newValue = clampValue(Number(inputValue) - step)
      setInputValue(newValue.toString())
      onValueChange(newValue)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/[^0-9-]/g, '')
      
      if (newValue === '' || newValue === '-') {
        setInputValue(newValue)
        return
      }

      const numericValue = parseInt(newValue, 10)
      if (!isNaN(numericValue)) {
        const clampedValue = clampValue(numericValue)
        if (clampedValue.toString() !== newValue) {
          setInputValue(clampedValue.toString())
          onValueChange(clampedValue)
        } else {
          setInputValue(newValue)
          onValueChange(numericValue)
        }
      }
    }

    const handleBlur = () => {
      if (inputValue === '' || inputValue === '-') {
        const defaultValue = clampValue(0)
        setInputValue(defaultValue.toString())
        onValueChange(defaultValue)
      } else {
        const numericValue = parseInt(inputValue, 10)
        const clampedValue = clampValue(numericValue)
        setInputValue(clampedValue.toString())
        onValueChange(clampedValue)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        handleIncrement()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        handleDecrement()
      } else if (e.key === 'Enter') {
        e.preventDefault()
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
          aria-label="Decrease value"
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
          onKeyDown={handleKeyDown}
          className="w-20 text-center mx-2"
          disabled={lecture}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={Number(inputValue)}
        />
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleIncrement} 
          disabled={Number(inputValue) >= max}
          type="button"
          aria-label="Increase value"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    )
  }
)

CustomNumberInput.displayName = 'CustomNumberInput'