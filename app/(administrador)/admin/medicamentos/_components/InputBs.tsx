"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// Definimos el esquema de validación
const formSchema = z.object({
  precio: z.string().min(1, "El precio es requerido"),
})

type FormValues = z.infer<typeof formSchema>

// Componente personalizado para el CurrencyInput
const FormCurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
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
        intlConfig={{ locale: "es-BO", currency: "BOB" }}
        allowNegativeValue={false}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
        ref={ref}
      />
    )
  }
)
FormCurrencyInput.displayName = "FormCurrencyInput"

export default function CurrencyForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      precio: "",
    },
  })

  function onSubmit(values: FormValues) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="precio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Controller
                  name="precio"
                  control={form.control}
                  render={({ field: { onChange, value, ...restField } }) => (
                    <FormCurrencyInput
                      {...restField}
                      value={value}
                      onValueChange={(value: string | undefined) => onChange(value)}
                    />
                  )}
                />
              </FormControl>
			  <FormDescription>
                Ingrese el precio en bolivianos (Bs.) usando el punto (.) como separador decimal.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  )
}