type AccountPageContainerProps = {
  children: React.ReactNode
}

export default function AccountPageContainer({
  children,
}: AccountPageContainerProps) {
  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] rounded-lg bg-muted p-6">
      {children}
    </div>
  )
}
