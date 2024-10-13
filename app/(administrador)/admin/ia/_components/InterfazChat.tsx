'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/store/chatStore';
import { MensajeChat } from './MensajeChat';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { enviarMensaje, obtenerVoces } from '@/actions/chat';
import { VozElevenLabs } from '@/types/chat';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export const InterfazChat: React.FC = () => {
	const [entrada, setEntrada] = useState('');
	const [voces, setVoces] = useState<VozElevenLabs[]>([]);
	const [vozSeleccionada, setVozSeleccionada] = useState<string>('');
	const { mensajes, agregarMensaje } = useChatStore();
	const [cargando, setCargando] = useState(false);
	const [ultimoMensajeIAId, setUltimoMensajeIAId] = useState<string | null>(null);
	const scrollAreaRef = useRef<HTMLDivElement>(null);
	const mensajesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// obtenerVoces().then(setVoces);
	}, []);

	useEffect(() => {
		mensajesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [mensajes, cargando]);

	const manejarEnvioMensaje = async () => {
		// if (!entrada.trim() || !vozSeleccionada) return;
		if (!entrada.trim()) return;

		const mensajeUsuario = {
			id: Date.now().toString(),
			contenido: entrada,
			rol: 'usuario' as const,
			timestamp: new Date(),
		};

		agregarMensaje(mensajeUsuario);
		setEntrada('');
		setCargando(true);
		setUltimoMensajeIAId(null); // Resetea el ID del último mensaje de la IA
		try {
			const { texto, audioUrl } = await enviarMensaje(entrada, vozSeleccionada);

			const mensajeIA = {
				id: (Date.now() + 1).toString(),
				contenido: texto,
				rol: 'asistente' as const,
				timestamp: new Date(),
				audioUrl,
			};

			agregarMensaje(mensajeIA);
			setUltimoMensajeIAId(mensajeIA.id); // Actualiza el ID del último mensaje de la IA
		} catch (error) {
			console.error("Error al enviar mensaje:", error);
		} finally {
			setCargando(false);
		}
	};

	return (
		<div className="flex flex-col h-[calc(90vh-4rem)] rounded-xl shadow-2xl dark:bg-[#020817]">
			<ScrollArea className="flex-1" ref={scrollAreaRef}>
				<div className="p-4">
					{mensajes.map((mensaje) => (
						<MensajeChat key={mensaje.id} mensaje={mensaje} esUltimoMensajeIA={mensaje.id === ultimoMensajeIAId}/>
					))}
					{cargando && (
						<div className="flex justify-start mb-4 p-2 flex-col bg-[#d9f99d] rounded-xl">
							<Skeleton className="flex w-fit bg-transparent mb-2">
								<Avatar className="w-10 h-10 mb-1">
									<AvatarImage src='/images/sofia.jpg' />
									<AvatarFallback>AI</AvatarFallback>
								</Avatar>
								<span className="flex items-center font-flow text-xl font-bold mx-2">
									Sofia
								</span>
							</Skeleton>

							<div className="ml-2 space-y-2">
								<Skeleton className="h-7 w-3/6" />
								<Skeleton className="h-7 w-2/6" />
								<Skeleton className="h-7 w-2/6" />
							</div>
						</div>
					)}
					<div ref={mensajesEndRef} />
				</div>
			</ScrollArea>
			<Separator  className='w-full h-1'/>
			<div className="p-4 border-t">
				<div className="flex items-center mb-4">
					<Label htmlFor="voz" className="mr-2">Seleccionar voz:</Label>
					<Select onValueChange={setVozSeleccionada} value={vozSeleccionada}>
						<SelectTrigger id="voz">
							<SelectValue placeholder="Selecciona una voz" />
						</SelectTrigger>
						<SelectContent>
							{voces.map((voz) => (
								<SelectItem key={voz.voice_id} value={voz.voice_id}>
									{voz.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex items-center">
					<Textarea
						value={entrada}
						onChange={(e) => setEntrada(e.target.value)}
						placeholder="Escribe tu mensaje..."
						className="flex-1 mr-2 resize-none"
						onKeyPress={(e) => {
							if (e.key === 'Enter' && !e.shiftKey) {
								e.preventDefault();
								manejarEnvioMensaje();
							}
						}}
					/>
					{/* <Button onClick={manejarEnvioMensaje} disabled={cargando || !!ultimoMensajeIAId}> */}
					<Button onClick={manejarEnvioMensaje} disabled={cargando}>
						<Send className="mr-2 h-4 w-4" /> Enviar
					</Button>
				</div>
			</div>
		</div>
	);
};