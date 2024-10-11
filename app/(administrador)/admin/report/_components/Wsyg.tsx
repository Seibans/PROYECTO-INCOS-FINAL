"use client";
import { useState } from 'react'
import { Content } from '@tiptap/react'
import DynamicMinimalTiptapEditor from '@/components/minimal-tiptap/DynamicMinimalTiptapEditor';
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { Editor } from '@tiptap/core'
import { useCallback, useRef } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip';

const formSchema = z.object({
	description: z
		.string({
			required_error: 'Description is required'
		})
		.min(1, 'Description is required')
})

type FormValues = z.infer<typeof formSchema>

export const ExampleForm: React.FC = () => {
	const [value, setValue] = useState<Content>('')
	const editorRef = useRef<Editor | null>(null)
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			description: ''
		}
	})

	const handleCreate = useCallback(
		({ editor }: { editor: Editor }) => {
			if (form.getValues('description') && editor.isEmpty) {
				editor.commands.setContent(form.getValues('description'))
			}
			editorRef.current = editor
		},
		[form]
	)

	const onSubmit = (values: FormValues) => {
		console.log('==Getting values from form==')
		console.log(values)
		console.log('Success: Values retrieved from form')

		setTimeout(() => {
			console.log('==Clearing form==')
			form.reset()
			console.log('Success: Form cleared')
		}, 1000)

		setTimeout(() => {
			console.log('==Clearing editor==')
			editorRef.current?.commands.clearContent()
			console.log('Success: Editor cleared')
		}, 2000)

		setTimeout(() => {
			console.log('==Resetting editor==')
			editorRef.current?.commands.setContent('')
			console.log('Success: Editor reset')
		}, 3000)

		setTimeout(() => {
			console.log('==Setting editor content==')
			editorRef.current?.commands.setContent(values.description)
			console.log('Success: Editor content set')
		}, 4000)
	}

	return (
		<>
			<div className="px-4 py-12 sm:py-24">
				<div className="mx-auto w-full max-w-3xl">
					<div className="mt-12 flex flex-col gap-12 sm:mt-20">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											{/* <FormLabel className="sr-only">Description:</FormLabel> */}
											<FormLabel>Description:</FormLabel>
											<FormControl>
												<TooltipProvider>
													<DynamicMinimalTiptapEditor
														{...field}
														throttleDelay={0}
														className={cn('w-full', {
															'border-destructive focus-within:border-destructive': form.formState.errors.description
														})}
														editorContentClassName="some-class"
														output="html"
														placeholder="Escribe aquí tu descripción..."
														onCreate={handleCreate}
														autofocus={true}
														editable={true}
														injectCSS={true}
														editorClassName="focus:outline-none p-5"
													/>
												</TooltipProvider>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" size="lg" className="w-full">
									Submit
								</Button>
							</form>
						</Form>
					</div>
				</div>
			</div>
		</>
	)
}
