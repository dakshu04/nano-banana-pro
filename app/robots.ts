import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Block pages you don't want Google to see
    },
    sitemap: 'https://snapmod.xyz/sitemap.xml', // Change to your domain
  }
}