import Link from 'next/link'
import { Logo } from '@/components/common/logo'
import { NavMenu } from './nav-menu'
import { AuthButtons } from './auth-buttons'
import { ModeToggle } from './mode-toggle'
import { SearchBtn } from './search-btn'
import { MobileMenu } from './mobile-menu'

export async function Navbar() {
  return (
    <nav className="mb-4 h-16 w-full">
      <div className="fixed flex h-16 w-full items-center justify-between border-b border-border/30 bg-background bg-opacity-50 px-4 lg:px-8">
        <div className="flex items-center justify-center gap-2">
          <Link href="/" className="hidden md:block">
            <Logo text="SagesWeb" className="hidden lg:block" />
          </Link>
          <MobileMenu />
        </div>
        <NavMenu />
        <div className="flex items-center gap-3">
          <div className="hidden items-center justify-center gap-1 min-[300px]:flex">
            <SearchBtn />
            <ModeToggle />
          </div>
          <AuthButtons />
        </div>
      </div>
    </nav>
  )
}
