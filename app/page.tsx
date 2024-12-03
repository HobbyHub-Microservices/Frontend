'use client'

import React, {useEffect, useState} from 'react'
import { LeftSidebar } from './components/left-sidebar'
import { PostCard } from '@/components/post-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

// This would typically come from a database or API
const posts = [
  {
    id: 1,
    title: "My latest watercolor painting",
    content: "Just finished this landscape piece. What do you think?",
    author: "ArtisticSoul",
    hobby: "Painting",
    likes: 42,
    comments: [
      {
        id: 1,
        author: "NatureLover",
        content: "This is absolutely stunning! The way you've captured the light is incredible.",
        date: new Date('2020-11-20T10:36:01.516Z')
      },
      {
        id: 2,
        author: "WatercolorNewbie",
        content: "I'm just starting out with watercolors. Do you have any tips for beginners?",
        date: new Date('2020-11-20T10:36:01.516Z')
      }
    ],
    category: "DIY",
    date: new Date('2020-11-20T10:36:01.516Z'),
    images: [
      "/placeholder.svg?height=400&width=600&text=Watercolor+Painting+1",
      "/placeholder.svg?height=400&width=600&text=Watercolor+Painting+2",
      "/placeholder.svg?height=400&width=600&text=Watercolor+Painting+3"
    ]
  },
  {
    id: 2,
    title: "New personal record in marathon!",
    content: "Broke my PR by 5 minutes in today's city marathon. Hard work pays off!",
    author: "RunnerGirl",
    hobby: "Hiking",
    likes: 89,
    comments: [
      {
        id: 1,
        author: "FellowRunner",
        content: "Congratulations! That's an amazing achievement. What was your training regimen like?",
        date: new Date('2020-11-20T10:36:01.516Z')
      }
    ],
    category: "Storytime",
    date: new Date('2020-11-20T10:36:01.516Z'),
    images: [
      "/placeholder.svg?height=400&width=600&text=Marathon+Photo+1",
      "/placeholder.svg?height=400&width=600&text=Marathon+Photo+2"
    ]
  },
  {
    id: 3,
    title: "Chess strategy question",
    content: "In Sicilian Defense, what's your preferred response to the Moscow Variation?",
    author: "ChessMaster2000",
    hobby: "Gaming",
    likes: 23,
    comments: [
      {
        id: 1,
        author: "GrandmasterFlash",
        content: "I usually go for the Sveshnikov Variation. It leads to sharp, dynamic positions.",
        date: new Date('2020-11-20T10:36:01.516Z')
      },
      {
        id: 2,
        author: "KnightRider",
        content: "Have you considered the Kalashnikov Variation? It's less common but can catch opponents off-guard.",
        date: new Date(2023, 4, 13, 11, 30)
      }
    ],
    category: "Discussion",
    date: new Date('2020-11-20T10:36:01.516Z'),
    images: []
  },
  {
    id: 4,
    title: "My first sourdough bread!",
    content: "After weeks of feeding my starter, I finally baked my first loaf. The crumb is amazing!",
    author: "BreadHead",
    hobby: "Cooking",
    likes: 56,
    comments: [
      {
        id: 1,
        author: "SourdoughFanatic",
        content: "That's a beautiful loaf! How long did you let it proof?",
        date: new Date('2020-11-20T10:36:01.516Z'),
      }
    ],
    category: "DIY",
    date: new Date('2020-11-20T10:36:01.516Z'),
    images: [
      "/placeholder.svg?height=400&width=600&text=Sourdough+Bread"
    ]
  },
  {
    id: 5,
    title: "Captured the Milky Way last night",
    content: "Drove out to the countryside for some astrophotography. Here's the result!",
    author: "StarGazer",
    hobby: "Photography",
    likes: 112,
    comments: [
      {
        id: 1,
        author: "NightSkyLover",
        content: "Wow, the detail is incredible! What camera and settings did you use?",
        date: new Date('2020-11-20T10:36:01.516Z')
      },
      {
        id: 2,
        author: "AmateurAstronomer",
        content: "I can see the Andromeda galaxy in your shot! Amazing work.",
        date: new Date('2020-11-20T10:36:01.516Z')
      }
    ],
    category: "Storytime",
    date: new Date('2020-11-20T10:36:01.516Z'),
    images: [
      "/placeholder.svg?height=400&width=600&text=Milky+Way+Photo+1",
      "/placeholder.svg?height=400&width=600&text=Milky+Way+Photo+2",
      "/placeholder.svg?height=400&width=600&text=Milky+Way+Photo+3",
      "/placeholder.svg?height=400&width=600&text=Milky+Way+Photo+4"
    ]
  }
]

export default function Home() {
  const [selectedHobby, setSelectedHobby] = useState(null)
  const [activeTab, setActiveTab] = useState('new')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isClient, setIsClient] = useState(true)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleHobbySelect = (hobby) => {
    setSelectedHobby(hobby)
  }

  const filteredPosts = posts
    .filter(post => !selectedHobby || post.hobby.toLowerCase() === selectedHobby.name.toLowerCase())
    .filter(post => selectedCategory === 'all' || post.category === selectedCategory)
    .sort((a, b) => {
      if (activeTab === 'new') {
        return b.date.getTime() - a.date.getTime()
      } else {
        return b.likes - a.likes
      }
    })

  return (
      <div className="flex min-h-screen bg-background text-foreground">
        <LeftSidebar className="h-full" onHobbySelect={handleHobbySelect}/>
        <main className="flex-1 p-6 overflow-auto h-full">
          <div className="max-w-6xl mx-auto">
            {selectedHobby && (
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={`/placeholder.svg?height=48&width=48&text=${selectedHobby.name[0]}`}
                                   alt={selectedHobby.name}/>
                      <AvatarFallback>{selectedHobby.name[0]}</AvatarFallback>
                    </Avatar>
                    <h1 className="text-3xl font-bold">{selectedHobby.name}</h1>
                  </div>
                  <p className="text-lg text-muted-foreground mb-4">{selectedHobby.description}</p>
                </div>
            )}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex justify-between items-center mb-6">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Discussion">Discussion</SelectItem>
                  <SelectItem value="Storytime">Storytime</SelectItem>
                  <SelectItem value="DIY">DIY</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Create Post</Button>
            </div>
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                  <PostCard key={post.id} {...post} comments={post.comments.length}/>
              ))}
            </div>
            {filteredPosts.length === 0 && (
                <p className="text-center text-muted-foreground mt-8">No posts found for this hobby and category.</p>
            )}
          </div>
        </main>
      </div>
  )
}

