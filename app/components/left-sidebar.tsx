'use client'

import * as React from 'react'
import { Home, Zap, ThumbsUp, Search } from 'lucide-react'

import { Input } from '../../components/ui/input'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '../../components/ui/sidebar'

const allHobbies = [
  { name: 'Reading', description: 'Explore new worlds through books' },
  { name: 'Gardening', description: 'Grow your own plants and flowers' },
  { name: 'Cooking', description: 'Create delicious meals at home' },
  { name: 'Photography', description: 'Capture moments and memories' },
  { name: 'Painting', description: 'Express yourself through art' },
  { name: 'Hiking', description: 'Explore nature and stay fit' },
  { name: 'Gaming', description: 'Enjoy interactive entertainment' },
  { name: 'Knitting', description: 'Create cozy handmade items' },
  { name: 'Woodworking', description: 'Craft beautiful objects from wood' },
  { name: 'Yoga', description: 'Improve flexibility and mindfulness' },
]

export function LeftSidebar({ onHobbySelect }) {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filteredHobbies, setFilteredHobbies] = React.useState(allHobbies)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)
    const filtered = allHobbies.filter(hobby =>
        hobby.name.toLowerCase().includes(term)
    )
    setFilteredHobbies(filtered)
  }

  return (
      <Sidebar side="left" className="w-64 border-r">
        <SidebarHeader className="border-b p-4">
          <h2 className="text-lg font-semibold">Menu</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/">
                      <Home className="mr-2 h-4 w-4" />
                      <span>Home</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#latest">
                      <Zap className="mr-2 h-4 w-4" />
                      <span>Latest</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#most-liked">
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      <span>Most liked</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search hobbies..."
                    className="w-full pl-8"
                    value={searchTerm}
                    onChange={handleSearch}
                    aria-label="Search hobbies"
                />
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Hobbies</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredHobbies.map((hobby) => (
                    <SidebarMenuItem key={hobby.name}>
                      <SidebarMenuButton asChild onClick={() => onHobbySelect(hobby)}>
                        <button>{hobby.name}</button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
              </SidebarMenu>
              {filteredHobbies.length === 0 && (
                  <p className="text-sm text-muted-foreground p-2">No hobbies found</p>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
  )
}
