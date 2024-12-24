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

const mobileMenuItems = [
  { name: 'Home', href: '/' },
  { name: 'Spiritual Teachers', href: '/teachers' },
  { name: 'Resources', href: '/resources' },
]

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

export { footerLinks, navMenuItems, mobileMenuItems }
