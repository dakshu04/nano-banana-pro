import { MetadataRoute } from 'next'
import { guides } from './guides/guides'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://snapmod.xyz'
  const lastModified = new Date('2026-10-24')

  const pages: Array<{ path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }> = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/tools/ai-face-swap', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/tools/background-remover', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/tools/ai-script-writer', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/guides', priority: 0.8, changeFrequency: 'weekly' },
    ...guides.map((guide) => ({ path: `/guides/${guide.slug}`, priority: 0.8, changeFrequency: 'monthly' as const })),
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/acceptable-use', priority: 0.4, changeFrequency: 'yearly' },
  ]

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path || '/'}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
