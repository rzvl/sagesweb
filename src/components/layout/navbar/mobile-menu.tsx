import Link from 'next/link'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const mobileMenuItems = [
  { name: 'Home', href: '/' },
  { name: 'Spiritual Teachers', href: '/teachers' },
  { name: 'Resources', href: '/resources' },
]

export default function MobileMenu() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <div>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="sr-only" aria-hidden>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              Explore and navigate through the website with ease using our
              streamlined menu options.
            </SheetDescription>
          </SheetHeader>
          <ul className="mt-10 flex flex-col gap-3">
            {mobileMenuItems.map((item) => (
              <li key={item.name}>
                <SheetClose asChild>
                  <Link href={item.href}>{item.name}</Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  )
}
