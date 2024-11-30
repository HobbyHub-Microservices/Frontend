'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/../../components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/../../components/ui/avatar'
import { Badge } from '@/../../components/ui/badge'
import { Button } from '@/../../components/ui/button'
import { ThumbsUp, MessageSquare, Share2, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { CommentSection } from '@/../../components/comment-section'

// This would typically come from a database or API
const posts = [
  {
    id: 1,
    title: "My latest watercolor painting",
    content: "Just finished this landscape piece. What do you think? I've been working on improving my technique for capturing the light and shadows in natural scenes. This piece was inspired by a recent hiking trip in the mountains. I used a combination of wet-on-wet and dry brush techniques to create different textures. Let me know your thoughts and any suggestions for improvement!",
    author: "ArtisticSoul",
    hobby: "Painting",
    likes: 42,
    comments: [
      {
        id: 1,
        author: "NatureLover",
        content: "This is absolutely stunning! The way you've captured the light is incredible.",
        date: new Date(2023, 5, 15, 14, 30)
      },
      {
        id: 2,
        author: "WatercolorNewbie",
        content: "I'm just starting out with watercolors. Do you have any tips for beginners?",
        date: new Date(2023, 5, 15, 15, 45)
      }
    ],
    category: "DIY",
    date: new Date(2023, 5, 15),
    images: [
      "/placeholder.svg?height=400&width=600&text=Watercolor+Painting+1",
      "/placeholder.svg?height=400&width=600&text=Watercolor+Painting+2",
      "/placeholder.svg?height=400&width=600&text=Watercolor+Painting+3"
    ]
  },
  // ... (other posts)
]

export default function PostPage() {
  const params = useParams()
  const postId = parseInt(params.id as string)
  const post = posts.find(p => p.id === postId)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!post) {
    return <div>Post not found</div>
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % post.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + post.images.length) % post.images.length)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.author}`} alt={post.author} />
                <AvatarFallback>{post.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{post.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Posted by {post.author} in {post.hobby} • {post.date.toLocaleDateString() }
                </p>
              </div>
            </div>
            <Badge>{post.category}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-6">{post.content}</p>
          {post.images.length > 0 && (
            <div className="relative w-full h-[400px] mb-6">
              <Image
                src={post.images[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1} for ${post.title}`}
                fill
                style={{ objectFit: 'cover' }}
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" size="sm">
            <ThumbsUp className="mr-2 h-4 w-4" />
            {post.likes}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            {post.comments.length}
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </CardFooter>
      </Card>
      <CommentSection postId={post.id} initialComments={post.comments} />
    </div>
  )
}

