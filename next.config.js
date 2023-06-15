/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com'],
  },
  pageDataCollectionTimeout: 120000, // Increase the timeout to 2 minutes (120,000 milliseconds)
};

module.exports = nextConfig;

// const withSyncfusion = require('@syncfusion/ej2-react-scripts/config');

// module.exports = withSyncfusion({
//   /* Other configurations */
// });
