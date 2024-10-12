// import MillionLint from '@million/lint';
// import million from 'million/compiler';

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//         pathname: '**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'unsplash.com',
//         pathname: '**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'lh3.googleusercontent.com',
//         pathname: '**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//         pathname: '**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'utfs.io',
//         pathname: '**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'platform-lookaside.fbsbx.com',
//         pathname: '**'
//       },
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         port: '3000',
//         pathname: '/uploads/**',
//       },
//     ],
//   },
//   webpack: (config, { isServer }) => {
//     if (isServer) {
//       config.externals = [...config.externals, 'prisma', '@prisma/client']
//     }
//     return config
//   },
// };

// // const millionConfig = {
// //   auto: true,// if you're using RSC: auto: { rsc: true },
// // };
// export default MillionLint.next({
//   rsc: true
// })(nextConfig);
// // export default million.next(nextConfig, millionConfig);






import MillionLint from '@million/lint';
import million from 'million/compiler';

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
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
        pathname: '**'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
    ],
  }
};

// const millionConfig = {
//   auto: true,// if you're using RSC: auto: { rsc: true },
// };
export default nextConfig;
// export default million.next(nextConfig, millionConfig);