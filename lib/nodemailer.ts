import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
//   secure: process.env.NODE_ENV !== "development", // true,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
} as SMTPTransport.Options);

type EnviarEmailDto = {
  sender: Mail.Address,
  receipients: Mail.Address[],
  subject: string,
  // text: string,
  // html: string,
  message: string | undefined,
}

export const sendMail = async (dto: EnviarEmailDto) => {
  const { sender, receipients, subject, message } = dto;
  return transporter.sendMail({
    from: sender,
    to: receipients,
    subject,
    html: message,
    text: message,
  });
};

// Función para enviar el correo de verificación
export const enviarCorreodeVerificacion = async (email: string, token: string) => {
  const linkConfirmacion = `${process.env.NEXT_PUBLIC_APP_URL}/auth/nueva-verificacion?token=${token}`;
  
  const message = `<p>Click <a href="${linkConfirmacion}">aquí</a> para confirmar tu dirección de correo electrónico.</p>`;
  
  const sender = {
    name: "VETERINARIA GAMALIEL",
    address: "pablo.juegos12345@gmail.com",
  };

  const receipients = [
    {
      name: "Nuevo Usuario",
      address: email,
    },
  ];

  const subject = "Confirma tu Dirección de Correo Electrónico";

  return sendMail({
    sender,
    receipients,
    subject,
    message
  });
};