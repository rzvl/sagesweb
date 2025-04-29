import { Loader2 } from 'lucide-react'

export function Loader({ primary }: { primary?: boolean }) {
  return (
    <Loader2
      className={`h-8 w-8 animate-spin text-${primary && 'primary'}-foreground`}
    />
  )
}

export function FullPageLoader({ text }: { text: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-sm">
      <Loader />
      <div className="">{text}</div>
    </div>
  )
}
