import Link from 'next/link'
import { Logo } from '@/components/elements'

function AuthPageContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Logo text="SagesWeb" />
        </Link>
        {children}
      </div>
    </main>
  )
}

export default AuthPageContainer
