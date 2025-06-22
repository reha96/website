import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Private Access - Reha Tuncer',
  description: 'Private access area',
}

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
