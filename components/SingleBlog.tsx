// Image
import Link from 'next/link'
import Image from 'next/image'
import { IPostData } from '@/pages/index'
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function SingleBlog(postData: IPostData) {
  const {
    id, title, date, tag, description, category, cover,
  } = postData

  const defaultImage = `https://placeimg.com/350/160/technics/${id}`

  return (
    <Link href={`/posts/${id}`} className="block no-underline group">
      <Card className="flex flex-row h-40 hover:shadow-lg transition-all duration-300 group-hover:border-primary/20">
        <div className="relative w-[350px] overflow-hidden rounded-l-lg">
          <Image
            alt={title}
            src={cover || defaultImage}
            fill
            sizes="350px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl line-clamp-1 group-hover:text-primary transition-colors">{title}</CardTitle>
            <CardDescription className="line-clamp-2 text-base">{description}</CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-2 pt-0">
            <Badge variant="outline" className="hover:bg-primary/10">{category}</Badge>
            <Badge variant="secondary" className="hover:bg-secondary/80">{tag}</Badge>
            <span className="text-sm text-muted-foreground ml-auto">{date}</span>
          </CardFooter>
        </div>
      </Card>
    </Link>
  )
}

export default SingleBlog
