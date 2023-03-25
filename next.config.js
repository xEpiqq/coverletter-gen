/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  
  externals: {
    'pdfjs-dist/build/pdf': 'pdfjsLib',
  },

  webpack: (config, { isServer }) => {
    // Add node-loader to load binary files
    config.module.rules.push({
      test: /\.node$/,
      use: [
        {
          loader: "node-loader",
        },
      ],
    });

    if (!isServer) {
      // ...
    }

    return config;
  },
};

module.exports = nextConfig;
