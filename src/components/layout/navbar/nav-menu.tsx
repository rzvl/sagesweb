import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

const navMenuItems = [
  {
    name: 'Spiritual Teachers',
    href: '/teachers',
  },
  {
    name: 'Spiritual Resources',
    href: '/resources',
  },
]

export default function NavMenu() {
  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        {navMenuItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), 'bg-transparent')}
              >
                {item.name}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
