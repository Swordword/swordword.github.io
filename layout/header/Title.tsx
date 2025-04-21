import Link from 'next/link'
import Icon from '@/components/Icon'

const Title = () => {
  return (
    <Link href='/' className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
      <Icon src="#icon-sword" />
      <span className="text-lg font-semibold">Swordword</span>
    </Link>
  )
}

export default Title
