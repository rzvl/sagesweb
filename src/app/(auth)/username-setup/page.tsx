import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  AuthPageContainer,
  UsernameSetupForm,
} from '@/components/features/auth'
import { Suspense } from 'react'

export default function Page() {
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
            <UsernameSetupForm />
          </Suspense>
        </CardContent>
      </Card>
    </AuthPageContainer>
  )
}
