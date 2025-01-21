import Link from 'next/link'
import { Logo } from '@/components/elements'

type AuthPageContainerProps = {
  children: React.ReactNode
  showHeader?: boolean
  showFooter?: boolean
}

export default function AuthPageContainer({
  children,
  showHeader,
  showFooter,
}: AuthPageContainerProps) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      {showHeader && <AuthPageHeader />}
      <main>{children}</main>
      {showFooter && <AuthPageFooter />}
    </div>
  )
}

function AuthPageHeader() {
  return (
    <header className="mx-auto">
      <Link href="/">
        <Logo text="SagesWeb" />
      </Link>
    </header>
  )
}

function AuthPageFooter() {
  return (
    <footer className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
      By clicking continue, you agree to our{' '}
      <Link href="/terms" target="_blank">
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link href="/privacy-policy" target="_blank">
        Privacy Policy
      </Link>
      .
    </footer>
  )
}
