import million from "million/compiler";
 
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['res.cloudinary.com', 'unsplash.com', 'lh3.googleusercontent.com'],
//   },
// };
 
// const millionConfig = {
//   auto: true,// if you're using RSC: auto: { rsc: true },
// };
 
// export default million.next(nextConfig, millionConfig);


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',  // Añadido este dominio
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io', // Añade esta línea
        pathname: '**', // Permitir cualquier ruta
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
        pathname: '**'
      },
      // Aquí agregamos localhost para permitir cargar imágenes desde allí.
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000', // Especifica el puerto si es necesario (3000 en desarrollo)
        pathname: '/uploads/**', // Permite imágenes de la carpeta /uploads
      },
    ],
  },
};

// const millionConfig = {
//   auto: true,// if you're using RSC: auto: { rsc: true },
// };
export default nextConfig;
// export default million.next(nextConfig, millionConfig);