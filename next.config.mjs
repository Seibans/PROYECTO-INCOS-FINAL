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
  reactStrictMode: true,
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
    ],
  },
};

const millionConfig = {
  auto: true,// if you're using RSC: auto: { rsc: true },
};

export default million.next(nextConfig, millionConfig);