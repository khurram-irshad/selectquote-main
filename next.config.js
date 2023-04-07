module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ["images.ctfassets.net"],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
    {
      // Set the cache control headers for all responses
      source: '/',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=600',
        },
      ],
    },
    {
      // Set the cache control headers for all responses
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=600',
        },
      ],
    },
    {
      // matching all API routes
      source: "/api/:path*",
      headers: [
        {
          key: "Access-Control-Allow-Origin",
          value: "*"
        },
        {
          key: 'Cache-Control',
          value: 'private, no-cache, no-store, max-age=0, must-revalidate',
        },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET,OPTIONS,PATCH,DELETE,POST,PUT"
        }
      ]
    },
    ]
  }
};
