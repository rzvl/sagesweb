import { MainFooter, Navbar } from '@/components/layout'
import React from 'react'

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      {children}
      <MainFooter />
    </>
  )
}
