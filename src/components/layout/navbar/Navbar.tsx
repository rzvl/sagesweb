import Link from 'next/link'
import { Logo } from '@/components/elements'
import NavMenu from './nav-menu'
import AuthButtons from './auth-buttons'
import ModeToggle from '../mode-toggle'
import SearchBtn from './search-btn'
import MobileMenu from './mobile-menu'

const Navbar = () => {
  return (
    <nav className="absolute flex h-16 w-full items-center justify-between bg-transparent px-4 lg:px-8">
      <div className="flex items-center justify-center gap-2">
        <Link href="/">
          <Logo text="SagesWeb" className="hidden lg:block" />
        </Link>
        <MobileMenu />
      </div>
      <NavMenu />
      <div className="flex items-center gap-1">
        <div className="hidden items-center justify-center gap-1 sm:flex">
          <ModeToggle />
          <SearchBtn />
        </div>
        <AuthButtons />
      </div>
    </nav>
  )
}

export default Navbar
