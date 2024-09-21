// FormCurrencyInput.tsx

import { forwardRef } from 'react';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';

// Componente personalizado para el CurrencyInput
const FormPrecioInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (props, ref) => {
    return (
      <CurrencyInput
        id="input-example"
        name="precio"
        placeholder="Ingrese el precio"
        decimalsLimit={2}
        prefix="Bs."
        decimalSeparator="."
        groupSeparator=","
        fixedDecimalLength={2}
        intlConfig={{ locale: "es-BO", currency: "BOB" }}
        allowNegativeValue={false}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
        ref={ref}
      />
    );
  }
);

FormPrecioInput.displayName = "FormPrecioInput";

export default FormPrecioInput;



// 
// Componente personalizado para el CurrencyInput
// const FormCurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
// 	(props, ref) => {
// 		return (
// 			<CurrencyInput
// 				id="input-example"
// 				name="precio"
// 				placeholder="Ingrese el precio"
// 				decimalsLimit={2}
// 				prefix="Bs."
// 				decimalSeparator="."
// 				groupSeparator=","
// 				fixedDecimalLength={2}
// 				intlConfig={{ locale: "es-BO", currency: "BOB" }}
// 				allowNegativeValue={false}
// 				className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
// 				{...props}
// 				ref={ref}
// 			/>
// 		)
// 	}
// )
// FormCurrencyInput.displayName = "FormCurrencyInput"
