import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SeparatorWithText } from '@/components/elements'
import SignUpForm from './signup-form'
import LogInForm from './login-form'
import { OAuthButton } from '@/components/features/auth'

type AuthCardProps = {
  type: 'signup' | 'login'
}

export default async function AuthCard({ type }: AuthCardProps) {
  const data = {
    signup: {
      title: 'Join Today',
      description: 'Sign up with your Google account',
      footerText: 'Already have an account?',
      footerLinkHref: '/login',
      footerLinkText: 'Log In',
    },
    login: {
      title: 'Welcome back',
      description: 'Login with your Google account',
      footerText: "Don't have an account?",
      footerLinkHref: '/signup',
      footerLinkText: 'Sign up',
    },
  }[type]

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex flex-col gap-4">
          {/* <OAuthButton type="apple" /> */}
          <OAuthButton type="google" />
        </div>

        <SeparatorWithText text="Or continue with" />

        {type === 'signup' && <SignUpForm />}
        {type === 'login' && <LogInForm />}
      </CardContent>
      <CardFooter className="flex justify-center text-center text-sm">
        {data.footerText} &nbsp;
        <Link
          href={data.footerLinkHref}
          className="underline underline-offset-4"
        >
          {data.footerLinkText}
        </Link>
      </CardFooter>
    </Card>
  )
}
