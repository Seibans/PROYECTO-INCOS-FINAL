'use client'

import React, { forwardRef } from 'react';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';

interface FormPrecioInputProps extends Omit<CurrencyInputProps, 'onValueChange'> {
  onValueChange?: (value: string | undefined) => void;
  value?: string | number;
}

const FormPrecioInput = forwardRef<HTMLInputElement, FormPrecioInputProps>(
  ({ value, onValueChange, ...props }, ref) => {
    const handleValueChange = (value: string | undefined) => {
      if (onValueChange) {
        // Remove the "Bs. " prefix before passing the value
        const numericValue = value ? value.replace('Bs. ', '') : undefined;
        onValueChange(numericValue);
      }
    };

    // Convert value to string if it's a number
    const stringValue = typeof value === 'number' ? value.toString() : value;

    return (
      <CurrencyInput
        id="input-example"
        name="precio"
        placeholder="Ingrese el precio"
        decimalsLimit={2}
        prefix="Bs. "
        decimalSeparator="."
        groupSeparator=","
        allowNegativeValue={false}
        defaultValue={stringValue}
        onValueChange={handleValueChange}
        max={10000}
        min={0}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
        ref={ref}
      />
    );
  }
);

FormPrecioInput.displayName = "FormPrecioInput";

export default FormPrecioInput;