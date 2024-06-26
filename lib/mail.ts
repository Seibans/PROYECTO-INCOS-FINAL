import {Resend} from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const enviarCorreodeVerificacion = async (
	email: string,
	token: string
) => {
	const linkConfirmacion = `http://localhost:3000/auth/nueva-verificacion?token=${token}`;

	await resend.emails.send({
    	from: "onboarding@resend.dev",
    	to: email,
    	subject: "Confirma tu Dirección de Correo Electrónico",
		html:`<p>Click <a href="${linkConfirmacion}">aquí</a> para confirmar tu dirección de correo electrónico.</p>`,
    	// text: `
      	// 	Hola,
      
      	// 	Para verificar tu cuenta, por favor visita el siguiente enlace:
      	// 	${process.env.VERIFICATION_URL}/${token}
    
      	// 	Graciass,
      	// 	Correode
    	// 	`,
  });
}; 