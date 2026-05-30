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
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      // Old solutions taxonomy → new sprint pages
      { source: '/solutions/automation', destination: '/solutions/build-launch', permanent: true },
      { source: '/solutions/analytics', destination: '/solutions/market-launch', permanent: true },
      { source: '/solutions/ai', destination: '/solutions/prototype-sprint', permanent: true },
      { source: '/solutions/roqchat', destination: '/chatbot', permanent: true },

      // Deprecated training section
      { source: '/training', destination: '/solutions', permanent: true },
      { source: '/training/:path*', destination: '/solutions', permanent: true },

      // Deprecated lead-magnet resources
      { source: '/resources', destination: '/solutions', permanent: true },
      { source: '/resources/:path*', destination: '/solutions', permanent: true },

      // Deprecated UAE landing page — keep traffic flowing to the home page
      { source: '/uae-ai-consulting', destination: '/', permanent: true },
    ]
  },
}

export default withMDX(nextConfig)
