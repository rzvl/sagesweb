import { Button } from '@/components/ui/button'

function OAuthButton({ children }: { children: React.ReactNode }) {
  return (
    <Button variant="outline" className="w-full" type="button">
      {children}
    </Button>
  )
}

function OAuthButtonGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>
}

export { OAuthButton, OAuthButtonGroup }
