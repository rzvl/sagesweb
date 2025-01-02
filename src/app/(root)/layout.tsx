import { MainFooter, Navbar } from '@/components/layout'
import React from 'react'

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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

export default RootLayout
