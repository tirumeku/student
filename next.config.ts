
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  },
  devIndicators: {
    allowedDevOrigins: [
      'https://6000-firebase-studio-1755834801207.cluster-64pjnskmlbaxowh5lzq6i7v4ra.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
