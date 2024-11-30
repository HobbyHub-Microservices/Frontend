import { ThumbsUp, MessageSquare, Share2, ImageIcon } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface PostCardProps {
  id: number
  title: string
  content: string
  author: string
  hobby: string
  likes: number
  comments: number
  category: string
  date: Date
  images: string[]
}

export function PostCard({ id, title, content, author, hobby, likes, comments, category, date, images }: PostCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${author}`} alt={author} />
              <AvatarFallback>{author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Posted by {author} in {hobby} • {date.toLocaleDateString()}
              </p>
            </div>
          </div>
          <Badge>{category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{content}</p>
        {images.length > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{images.length} image{images.length > 1 ? 's' : ''}</span>
          </div>
        )}
        <Link href={`/post/${id}`}>
          <Button variant="outline" className="w-full">View Post</Button>
        </Link>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">
          <ThumbsUp className="mr-2 h-4 w-4" />
          {likes}
        </Button>
        <Button variant="ghost" size="sm">
          <MessageSquare className="mr-2 h-4 w-4" />
          {comments}
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  )
}

