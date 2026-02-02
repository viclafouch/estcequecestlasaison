import { clientEnv } from '@/constants/env'
import type { Produce } from '@estcequecestlasaison/shared'
import { createFileRoute } from '@tanstack/react-router'

function buildUrlEntry(produce: Produce, lastmod: string) {
  const loc = `${clientEnv.VITE_SITE_URL}/${produce.slug}`

  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const { PRODUCE_LIST } = await import('../server/produce-data')

        const lastmod = new Date().toISOString().slice(0, 10)

        const produceUrls = PRODUCE_LIST.map((produce) => {
          return buildUrlEntry(produce, lastmod)
        }).join('\n')

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${clientEnv.VITE_SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${clientEnv.VITE_SITE_URL}/faq</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${clientEnv.VITE_SITE_URL}/calendrier</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${clientEnv.VITE_SITE_URL}/calendrier/fruits</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${clientEnv.VITE_SITE_URL}/calendrier/legumes</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
${produceUrls}
</urlset>`

        return new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml'
          }
        })
      }
    }
  }
})
