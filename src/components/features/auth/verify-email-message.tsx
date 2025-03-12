import { MailSearch } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ResendEmailVerificationButton } from '@/components/features/auth'
import { Suspense } from 'react'

type VerifyEmailMessageProps = {
  title: string
  description: string
  autoStartTimer?: boolean
}

export function VerifyEmailMessage({
  title,
  description,
  autoStartTimer = true,
}: VerifyEmailMessageProps) {
  return (
    <Card>
      <CardHeader>
        <MailSearch className="mx-auto h-20 w-20" />
        <h1 className="text-center text-2xl font-bold">{title}</h1>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardContent>
      <CardFooter>
        <Suspense>
          <ResendEmailVerificationButton autoStart={autoStartTimer} />
        </Suspense>
      </CardFooter>
    </Card>
  )
}
