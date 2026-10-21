/** @type {import('next').NextConfig} */
const { getSeoMode, logSeoMode } = require('./src/config/env.js');

// Log SEO decision at build time
logSeoMode();

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      // 0. Host-level redirect: www.aarsika.com -> https://aarsika.com
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.aarsika.com',
          },
        ],
        destination: 'https://aarsika.com/:path*',
        permanent: true,
      },
      // 1. Single product duplicate route: /product/:slug -> /products/:slug
      {
        source: '/product/:slug',
        destination: '/products/:slug',
        permanent: true,
      },
      // 2. Collections duplicate route: /collections -> /shop
      {
        source: '/collections',
        destination: '/shop',
        permanent: true,
      },
      // 3. Category canonicalization: aliases to /attar
      {
        source: '/collection/attars',
        destination: '/attar',
        permanent: true,
      },
      {
        source: '/collection/ittras',
        destination: '/attar',
        permanent: true,
      },
      {
        source: '/collection/attar',
        destination: '/attar',
        permanent: true,
      },
      {
        source: '/collections/attar',
        destination: '/attar',
        permanent: true,
      },
      // 4. Category canonicalization: aliases to /perfumes
      {
        source: '/collection/eau-de-parfums',
        destination: '/perfumes',
        permanent: true,
      },
      {
        source: '/collection/perfumes',
        destination: '/perfumes',
        permanent: true,
      },
      {
        source: '/collections/perfumes',
        destination: '/perfumes',
        permanent: true,
      },
      // 5. Category canonicalization: aliases to /gifting
      {
        source: '/collection/gift-sets',
        destination: '/gifting',
        permanent: true,
      },
      {
        source: '/collection/gifting',
        destination: '/gifting',
        permanent: true,
      },
      {
        source: '/collections/gifting',
        destination: '/gifting',
        permanent: true,
      },
      // 6. Category canonicalization: aliases to /discovery-sets
      {
        source: '/collection/trial-sets',
        destination: '/discovery-sets',
        permanent: true,
      },
      {
        source: '/collection/discovery-sets',
        destination: '/discovery-sets',
        permanent: true,
      },
      {
        source: '/collection/discovery',
        destination: '/discovery-sets',
        permanent: true,
      },
      // 7. Oud collection duplicate
      {
        source: '/collections/oud',
        destination: '/oud',
        permanent: true,
      },
      // 8. Policy duplicate route: /shipping -> /shipping-policy
      {
        source: '/shipping',
        destination: '/shipping-policy',
        permanent: true,
      },
      // 9. Exact /orders redirect (does NOT match /orders/:id)
      {
        source: '/orders',
        destination: '/account',
        permanent: true,
      },
      {
        source: '/account/orders',
        destination: '/account',
        permanent: true,
      },
      // 10. Thin category redirect: /personal-care (0 products) -> /shop
      {
        source: '/personal-care',
        destination: '/shop',
        permanent: true,
      },
    ];
  },
  async headers() {
    const seoMode = getSeoMode();

    if (!seoMode.isIndexable) {
      // In Staging, Preview, or Development environments, block search engine crawling completely
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'X-Robots-Tag',
              value: 'noindex, nofollow, noarchive, nosnippet',
            },
          ],
        },
      ];
    }

    // In Production: Allow public pages, block indexing on private transaction & account routes
    return [
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive',
          },
        ],
      },
      {
        source: '/checkout/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive',
          },
        ],
      },
      {
        source: '/account/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive',
          },
        ],
      },
      {
        source: '/order-success/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive',
          },
        ],
      },
      {
        source: '/cart',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

