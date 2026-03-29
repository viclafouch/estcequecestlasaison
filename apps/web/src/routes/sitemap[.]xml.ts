import type { Produce } from '@estcequecestlasaison/shared'
import { createFileRoute } from '@tanstack/react-router'
import { clientEnv } from '@/constants/env'

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
        const { PRODUCE_LIST } =
          await import('@estcequecestlasaison/shared/services')

        const now = new Date()
        const firstOfMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`

        const produceUrls = PRODUCE_LIST.map((produce) => {
          return buildUrlEntry(produce, firstOfMonth)
        }).join('\n')

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${clientEnv.VITE_SITE_URL}/</loc>
    <lastmod>${firstOfMonth}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${clientEnv.VITE_SITE_URL}/faq</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${clientEnv.VITE_SITE_URL}/calendrier</loc>
    <lastmod>${firstOfMonth}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${clientEnv.VITE_SITE_URL}/mentions-legales</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${clientEnv.VITE_SITE_URL}/confidentialite</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${clientEnv.VITE_SITE_URL}/cgu</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
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
