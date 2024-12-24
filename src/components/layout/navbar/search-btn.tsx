import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

const SearchBtn = () => {
  return (
    <Button variant="ghost" size="icon">
      <Search className="h-[1.5rem] w-[1.5rem]" />
    </Button>
  )
}

export default SearchBtn
