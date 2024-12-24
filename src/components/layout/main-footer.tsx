import { footerLinks } from '@/lib/constants'
import Link from 'next/link'
import Logo from '@/components/common/logo'
// import Image from 'next/image'
import Twitter from '@/components/icons/twitter'
import Pinterest from '../icons/pinterest'
import Facebook from '../icons/facebook'
import Instagram from '../icons/instagram'
// import { cn } from '@/lib/utils'

function MainFooter() {
  return (
    <footer className="mx-8 mb-10 flex flex-1 flex-col flex-wrap justify-start gap-6 sm:flex-row">
      <div className="order-last mr-8 flex w-full flex-row justify-between gap-6 sm:order-first sm:w-32 sm:flex-col sm:justify-start">
        <Logo text="&copy; 2025" className="ml-4 text-base font-normal" />
        <SocialLinks
          width={20}
          height={20}
          className="fill-gray-900 transition hover:fill-gray-950"
        />
      </div>
      <div className="mb-10 flex flex-1 flex-wrap justify-between gap-6 sm:mx-1">
        {footerLinks.map((item) => (
          <div key={item.column} className="flex w-32 flex-col gap-2">
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

interface SocialLinksProps {
  width: number
  height: number
  className?: string
}

function SocialLinks({ width, height, className }: SocialLinksProps) {
  return (
    <ul className="flex gap-2">
      <li>
        <Link href="#" target="_blank">
          <Twitter width={width} height={height} className={className} />
        </Link>
      </li>
      <li>
        <Link href="#" target="_blank">
          <Pinterest width={width} height={height} className={className} />
        </Link>
      </li>
      <li>
        <Link href="#" target="_blank">
          <Facebook width={width} height={height} className={className} />
        </Link>
      </li>
      <li>
        <Link href="#" target="_blank">
          <Instagram width={width} height={height} className={className} />
        </Link>
      </li>
    </ul>
  )
}

export default MainFooter
