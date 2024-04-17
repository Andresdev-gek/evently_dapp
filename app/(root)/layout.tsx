import React from 'react'
import Header from '../../components/shared/Header'
import Footer from '../../components/shared/Footer'
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className='flex h-screen flex-col'>
        <Header />
        <main className='flex-1'>
          {children}
          <SpeedInsights />
        </main>
        <Footer />
      </div>
    )
  }