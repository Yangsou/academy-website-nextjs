import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const createStrapiRemotePattern = () => {
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? process.env.STRAPI_API_URL

  if (!strapiBaseUrl) {
    return null
  }

  try {
    const parsedUrl = new URL(strapiBaseUrl)
    const protocol = parsedUrl.protocol.replace(':', '')
    const pathname = parsedUrl.pathname.replace(/\/+$/, '')
    const normalizedPathname = pathname.length > 0 ? `${pathname}/**` : '/**'

    return {
      protocol,
      hostname: parsedUrl.hostname,
      ...(parsedUrl.port ? { port: parsedUrl.port } : {}),
      pathname: normalizedPathname,
    }
  } catch (error) {
    console.warn('Invalid STRAPI_API_URL/NEXT_PUBLIC_STRAPI_API_URL provided:', error)
    return null
  }
}

const remotePatterns = [
  {
    protocol: 'http',
    hostname: 'localhost',
  },
  {
    protocol: 'http',
    hostname: 'localhost',
    port: '1337',
    pathname: '/uploads/**',
  },
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
  },
  {
    protocol: 'https',
    hostname: 'via.placeholder.com',
  },
  {
    protocol: 'https',
    hostname: 'placehold.co',
  },
  {
    protocol: 'https',
    hostname: 'picsum.photos',
  },
  {
    protocol: 'https',
    hostname: '*.strapiapp.com',
  },
]

const strapiRemotePattern = createStrapiRemotePattern()

if (strapiRemotePattern) {
  remotePatterns.push(strapiRemotePattern)
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable image optimization
    unoptimized: false,

    // Image formats to support
    formats: ['image/webp', 'image/avif'],

    // Image sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Remote patterns for external image handling
    remotePatterns,

    // Loader configuration for custom optimization
    loader: 'default',

    // Minimum cache time in seconds
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Enable experimental optimizations
  experimental: {
    // Enable package imports optimization
    optimizePackageImports: ['lucide-react'],
    outputFileTracingRoot: __dirname,
  },

  // Compiler optimizations
  compiler: {
    // Enable emotion optimization if using it
    // emotion: true,

    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Output configuration for performance
  output: 'standalone',

  // Enable compression
  compress: true,

  // PoweredBy header removal
  poweredByHeader: false,

  env: {
    disableCareer: true,
  },
}

export default nextConfig
