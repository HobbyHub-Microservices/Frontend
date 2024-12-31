import React, { useEffect, useState } from 'react';
import { Home, Zap, ThumbsUp, Search } from 'lucide-react';
import { Input } from '../../components/ui/input';
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
} from '../../components/ui/sidebar';

// Define the Hobby type
interface Hobby {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

// Define the props for the LeftSidebar component
interface LeftSidebarProps {
  onHobbySelect: (hobby: Hobby) => void;
}

export function LeftSidebar({ onHobbySelect }: LeftSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [allHobbies, setAllHobbies] = useState<Hobby[]>([]);
  const [filteredHobbies, setFilteredHobbies] = useState<Hobby[]>([]);

  // Fetch hobbies from API
  useEffect(() => {
    const fetchHobbies = async () => {
      console.log('Fetching hobbies from API...');
      try {
        const response = await fetch('http://hobbyhub.com/api/hobby');
        if (!response.ok) {
          console.error('API error:', response.status, response.statusText);
          return;
        }
        const data: Hobby[] = await response.json();
        console.log('Fetched data:', data);

        // Check if data is valid
        if (Array.isArray(data)) {
          setAllHobbies(data);
          setFilteredHobbies(data);
          console.log('State updated with hobbies:', data);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching hobbies:', error);
      }
    };

    fetchHobbies();
  }, []);

  // Handle search input
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    console.log('Search term:', term);
    setSearchTerm(term);

    const filtered = allHobbies.filter((hobby) =>
        hobby.name.toLowerCase().includes(term)
    );
    setFilteredHobbies(filtered);
    console.log('Filtered hobbies:', filtered);
  };

  return (
      <Sidebar side="left" className="w-64 border-r">
        <SidebarHeader className="p-4">
          <h2 className="text-lg font-semibold">HobbyHub</h2>
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
                    <SidebarMenuItem key={hobby.id}>
                      <SidebarMenuButton asChild onClick={() => onHobbySelect(hobby)}>
                        <button>{hobby.name}</button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
              </SidebarMenu>
              {filteredHobbies.length === 0 && (
                  <p className="text-sm text-muted-foreground p-2">
                    No hobbies found
                  </p>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
  );
}
