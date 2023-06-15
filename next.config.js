/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;

// const withSyncfusion = require('@syncfusion/ej2-react-scripts/config');

// module.exports = withSyncfusion({
//   /* Other configurations */
// });
