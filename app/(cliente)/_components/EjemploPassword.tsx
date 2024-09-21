"use client"
import { generarPassword } from '@/lib/generarPassword';
import React, { useState } from 'react';

export const PasswordGenerator = () => {
	const [password, setPassword] = useState<string>('');
  
	const handleGeneratePassword = () => {
	  const newPassword = generarPassword();
	  setPassword(newPassword);
	};
  
	return (
	  <div>
		<input 
		  type="text" 
		  value={password} 
		  readOnly 
		  placeholder="Genera una contraseña" 
		  className="p-2 border rounded" 
		/>
		<button 
		  onClick={handleGeneratePassword} 
		  className="p-2 ml-2 bg-blue-500 text-white rounded"
		>
		  Generar Contraseña
		</button>
	  </div>
	);
  };
  
  export default PasswordGenerator;