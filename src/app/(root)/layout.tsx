import MainFooter from '@/components/layout/main-footer'
import Navbar from '@/components/layout/navbar'
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
