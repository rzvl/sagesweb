import { Suspense } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  AuthPageContainer,
  UsernameSetupForm,
} from '@/components/features/auth'
import { Button } from '@/components/ui/button'
import { auth } from '@/server/auth'
import { AlertBox } from '@/components/elements'

export default async function Page() {
  const session = await auth()

  if (!session?.user) {
    return <NotLoggedInCard />
  }

  if (session.user.username) {
    return <UserAlreadySetCard />
  }

  return (
    <AuthPageContainer showHeader>
      <Card>
        <CardHeader>
          <h1 className="text-center text-xl font-bold">
            Set Your Username to Continue
          </h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-5 text-muted-foreground">
            Before you can fully engage on SagesWeb.com, you need to choose a
            unique username.
          </p>
          <ul className="list-disc space-y-2 pl-4">
            <li className="text-sm leading-5 text-muted-foreground">
              Your username will be your identity on the platform.
            </li>
            <li className="text-sm leading-5 text-muted-foreground">
              It’s required for actions like commenting, reviewing, and
              interacting with others.
            </li>
            <li className="text-sm leading-5 text-muted-foreground">
              Once set, it <strong>cannot be changed</strong> later.
            </li>
          </ul>
          <p className="text-sm leading-5 text-muted-foreground">
            Choose your username now and start participating!
          </p>
          <Suspense>
            <UsernameSetupForm email={session.user.email} />
          </Suspense>
        </CardContent>
      </Card>
    </AuthPageContainer>
  )
}

function UserAlreadySetCard() {
  return (
    <AuthPageContainer showHeader>
      <Card>
        <CardHeader>
          <h1 className="text-center text-xl font-bold">User Already Set</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <AlertBox
            variant="destructive"
            message="You have already set up a username. Changes are not allowed."
          />
          <p className="text-sm leading-5 text-muted-foreground">
            You can now enjoy all the features of SagesWeb!
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </AuthPageContainer>
  )
}

function NotLoggedInCard() {
  return (
    <AuthPageContainer showHeader>
      <Card>
        <CardHeader>
          <h1 className="text-center text-xl font-bold">User Not Logged In</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <AlertBox variant="destructive" message="User not logged in!" />
          <p className="text-sm leading-5 text-muted-foreground">
            Please log in to create your username.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/login">Log In</Link>
          </Button>
        </CardFooter>
      </Card>
    </AuthPageContainer>
  )
}
