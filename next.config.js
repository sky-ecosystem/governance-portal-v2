const path = require('path');

require('dotenv').config({ path: './.env' });

const securityHeaders = [
  // Adds x-xss-protection
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },

  // adds x-frame-options
  // remove for safe app to load
  // {
  //   key: 'X-Frame-Options',
  //   value: 'SAMEORIGIN'
  // },

  // adds frame-ancestors which supercedes X-Frame-Options
  // https://nextjs.org/docs/advanced-features/security-headers#x-frame-options
  {
    key: 'frame-ancestors',
    value: 'https://app.safe.global'
  },

  // adds x-content-type
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },

  // required for safe app to load
  {
    key: 'Access-Control-Allow-Origin',
    value: '*'
  },

  {
    key: 'Access-Control-Allow-Methods',
    value: 'GET'
  },

  {
    key: 'Access-Control-Allow-Headers',
    value: 'X-Requested-With, content-type, Authorization'
  }
];

//// Main Next.js config
const moduleExports = {
  // everything in here gets exposed to the frontend.
  // prefer NEXT_PUBLIC_* instead, which makes this behavior more explicit
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    READ_ONLY: process.env.READ_ONLY
  },

  // Opt-in SWC minification (next 12.0.2)
  // swcMinify: true, // fatal runtime error: failed to initiate panic, error 5

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fixes npm packages that depend on `fs` module
      // https://github.com/vercel/next.js/issues/7755#issuecomment-508633125
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        dns: false,
        net: false,
        tls: false
      };
    }
    config.resolve.alias['lib'] = path.join(__dirname, 'lib');
    config.resolve.alias['components'] = path.join(__dirname, 'components');
    config.resolve.alias['stores'] = path.join(__dirname, 'stores');

    return config;
  },

  async rewrites() {
    return [
      {
        source: '/delegates/:address',
        destination: '/address/:address'
      },
      {
        source: '/api/delegates',
        destination: '/api/delegates/v1'
      }
    ];
  },

  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders
      }
    ];
  },

  staticPageGenerationTimeout: 120
};

module.exports = moduleExports;
