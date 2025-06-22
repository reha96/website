import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Job Applications Tracker - Reha Tuncer',
  description: 'Track and manage job applications with Sankey flow visualization',
}

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
