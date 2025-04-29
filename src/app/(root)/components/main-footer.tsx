import Link from 'next/link'
import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  XIcon,
} from '@/components/icons'
import { Logo } from '@/components/common/logo'

const footerLinks = [
  {
    column: 'Teachers',
    links: [
      { name: 'Ascended Masters', href: '/teachers/ascended-masters' },
      { name: 'Channelers', href: '/teachers/channelers' },
      { name: 'Influencers', href: '/teachers/influencers' },
    ],
  },
  {
    column: 'Resources',
    links: [
      { name: 'Courses', href: '/resources/courses' },
      { name: 'Books', href: '/resources/books' },
      { name: 'Videos', href: '/resources/videos' },
    ],
  },
  {
    column: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/contact' },
    ],
  },
  {
    column: 'Legal',
    links: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
    ],
  },
]

export function MainFooter() {
  return (
    <footer className="mx-8 mb-2 flex flex-1 flex-col flex-wrap justify-start gap-6 md:flex-row">
      <div className="order-last flex w-full flex-row justify-between gap-6 md:order-first md:w-48 md:flex-col md:justify-start">
        <Logo text="&copy; 2025" className="ml-4 text-base font-normal" />
        <SocialLinks
          size={20}
          className="fill-gray-900 transition hover:fill-gray-950"
        />
      </div>
      <div className="mb-10 flex flex-1 flex-wrap justify-between gap-6 sm:mx-1">
        {footerLinks.map((item) => (
          <div key={item.column} className="flex w-36 flex-col gap-2">
            <h2 className="text-sm font-semibold uppercase">{item.column}</h2>
            <ul className="flex flex-col gap-1">
              {item.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-900 transition hover:text-gray-950"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}

type SocialLinksProps = {
  size: number
  className?: string
}

function SocialLinks({ size, className }: SocialLinksProps) {
  return (
    <ul className="flex gap-2">
      <li>
        <Link href="#" target="_blank">
          <XIcon width={size} height={size} className={className} />
        </Link>
      </li>
      <li>
        <Link href="#" target="_blank">
          <PinterestIcon width={size} height={size} className={className} />
        </Link>
      </li>
      <li>
        <Link href="#" target="_blank">
          <FacebookIcon width={size} height={size} className={className} />
        </Link>
      </li>
      <li>
        <Link href="#" target="_blank">
          <InstagramIcon width={size} height={size} className={className} />
        </Link>
      </li>
    </ul>
  )
}
