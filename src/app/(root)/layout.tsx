import React from 'react'
import { MainFooter } from './components/main-footer'
import { Navbar } from './components/navbar'

export default function Layout({
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
