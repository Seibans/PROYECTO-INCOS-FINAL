'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mensaje } from '@/types/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUsuarioActual } from '@/hooks/use-usuario-actual';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface PropsMensajeChat {
  mensaje: Mensaje;
  esUltimoMensajeIA: boolean;
}

export const MensajeChat: React.FC<PropsMensajeChat> = ({ mensaje, esUltimoMensajeIA }) => {
  const usuarioActual = useUsuarioActual();
  const esUsuario = mensaje.rol === 'usuario';
  const [reproduciendo, setReproduciendo] = useState(false);
  const [duracion, setDuracion] = useState(0);
  const [tiempoActual, setTiempoActual] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState('');


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuracion(audioRef.current!.duration);
      });
      audioRef.current.addEventListener('timeupdate', () => {
        setTiempoActual(audioRef.current!.currentTime);
      });
      audioRef.current.addEventListener('ended', () => {
        setReproduciendo(false);
        setTiempoActual(0);
      });
    }
  }, []);

  useEffect(() => {
    if (esUltimoMensajeIA && !esUsuario && mensaje.audioUrl && audioRef.current) {
      audioRef.current.play();
      setReproduciendo(true);
    }
  }, [esUltimoMensajeIA, esUsuario, mensaje.audioUrl]);

  useEffect(() => {
    const actualizarTiempo = () => {
      setTiempoTranscurrido(
        formatDistanceToNow(new Date(mensaje.timestamp), { addSuffix: true, locale: es })
      );
    };
    actualizarTiempo();
    const intervalo = setInterval(actualizarTiempo, 60000); // Actualizar cada minuto
    return () => clearInterval(intervalo);
  }, [mensaje.timestamp]);

  const reproducirAudio = () => {
    if (audioRef.current) {
      if (reproduciendo) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setReproduciendo(!reproduciendo);
    }
  };

  const cambiarTiempo = (nuevoTiempo: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = nuevoTiempo[0];
      setTiempoActual(nuevoTiempo[0]);
    }
  };

  const formatTiempo = (tiempo: number) => {
    const minutos = Math.floor(tiempo / 60);
    const segundos = Math.floor(tiempo % 60);
    return `${minutos}:${segundos.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex ${esUsuario ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${esUsuario ? 'flex-row-reverse items-end' : 'flex-row'} items-start flex-col bg-gray-200 dark:bg-gray-800 p-1 rounded-lg`}>
        <div className={`flex ${esUsuario ? 'flex-row-reverse' : 'flex-row'}`}>
          <Avatar className="w-10 h-10 m-1 mb-2">
            <AvatarImage src={esUsuario ? `${usuarioActual?.image || ""}` : '/images/sofia.jpg'} />
            <AvatarFallback className={`${esUsuario ? "bg-orange-400" : "bg-gray-100"}`}>{esUsuario ? `${usuarioActual?.name?.[0] || ""}` : 'AI'}</AvatarFallback>
          </Avatar>
          <span className="flex items-center font-flow text-xl font-bold mx-2">
            {esUsuario ? usuarioActual?.name : 'Sofia'}
          </span>
        </div>
        <div
          className={`mx-2 py-2 px-4 rounded-lg ${esUsuario ? 'bg-gray-300 dark:bg-gray-700' : 'bg-[#d9f99d] dark:bg-[#597a1c]'
            }`}
        >
          {!esUsuario && esUltimoMensajeIA ? (
            <TextGenerateEffect words={mensaje.contenido} />
          ) : (
            mensaje.contenido
          )}
        </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 mx-2 p-1">
            {tiempoTranscurrido}
          </span>
        {!esUsuario && mensaje.audioUrl && (
          <div className="mt-2 w-full">
            <audio ref={audioRef} src={mensaje.audioUrl} />
            <div className="flex items-center space-x-2">
              <Button
                onClick={reproducirAudio}
                variant="ghost"
                size="sm"
              >
                {reproduciendo ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Slider
                value={[tiempoActual]}
                max={duracion}
                step={0.1}
                onValueChange={cambiarTiempo}
                className="w-full"
              />
              <span className="text-xs">
                {formatTiempo(tiempoActual)} / {formatTiempo(duracion)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};