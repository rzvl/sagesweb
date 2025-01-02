import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

type AuthCardProps = {
  className?: string
  children?: React.ReactNode
  hideLegalSection?: boolean
}

function AuthCard({ className, children, hideLegalSection }: AuthCardProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <Card>{children}</Card>
      {!hideLegalSection && (
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
          By clicking continue, you agree to our{' '}
          <Link href="/terms" target="_blank">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy-policy" target="_blank">
            Privacy Policy
          </Link>
          .
        </div>
      )}
    </div>
  )
}

type AuthCardHeaderProps = {
  title: string
  description?: string
}

function AuthCardHeader({ title, description }: AuthCardHeaderProps) {
  return (
    <CardHeader className="text-center">
      <CardTitle className="text-xl">{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
  )
}

function AuthCardContent({ children }: { children: React.ReactNode }) {
  return (
    <CardContent>
      <div className="grid gap-6">{children}</div>
    </CardContent>
  )
}

type AuthCardFooterProps = {
  text: string
  href: string
  linkText: string
}

function AuthCardFooter({ text, href, linkText }: AuthCardFooterProps) {
  return (
    <CardFooter className="flex justify-center text-center text-sm">
      {text} &nbsp;
      <Link href={href} className="underline underline-offset-4">
        {linkText}
      </Link>
    </CardFooter>
  )
}

export { AuthCard, AuthCardContent, AuthCardFooter, AuthCardHeader }
