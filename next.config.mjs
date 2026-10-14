import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [['remark-gfm']],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  turbopack: {
    root: import.meta.dirname,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      // Specific legacy paths before the sprint-catalog wildcard.
      { source: '/case-studies/zaynenair', destination: '/case-studies', permanent: true },
      { source: '/solutions/roqchat', destination: '/chatbot', permanent: true },
      { source: '/solutions/automation', destination: '/services/ai-automation', permanent: true },
      { source: '/solutions/ai', destination: '/services/ai-automation', permanent: true },
      { source: '/solutions/analytics', destination: '/services', permanent: true },
      { source: '/solutions', destination: '/services', permanent: true },
      { source: '/solutions/:path*', destination: '/services/websites-web-apps', permanent: true },
      { source: '/sample-sprint-plan', destination: '/services/websites-web-apps', permanent: true },
      { source: '/training', destination: '/services/ai-training', permanent: true },
      { source: '/training/:path*', destination: '/services/ai-training', permanent: true },
      { source: '/resources', destination: '/insights', permanent: true },
      { source: '/resources/:path*', destination: '/insights', permanent: true },
      { source: '/uae-ai-consulting', destination: '/', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default withMDX(nextConfig)
