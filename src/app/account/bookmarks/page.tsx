import { BookmarkX } from 'lucide-react'

export default function Page() {
  return (
    <section className="flex w-full justify-center py-10">
      <NoBookmarks />
    </section>
  )
}

function NoBookmarks() {
  return (
    <div className="flex flex-col items-center gap-4 text-muted-foreground">
      <BookmarkX className="h-16 w-16" />
      <p className="text-center">
        <span className="font-bold">No bookmarks yet?</span>
        <br />
        Time to start building your personal library!
      </p>
    </div>
  )
}
