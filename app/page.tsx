'use client';

import React, { useEffect, useState } from 'react';
import keycloak, { initializeKeycloak, useKeycloak } from "../keycloak"; // Import Keycloak configuration
import { LeftSidebar } from './components/left-sidebar';
import { PostCard } from '@/components/post-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";
import post from "@/app/models/Post";

export default function Home() {
  const { isAuthenticated, user, keycloak } = useKeycloak(); // Access Keycloak context
  const [selectedHobby, setSelectedHobby] = useState(null);
  const [activeTab, setActiveTab] = useState("new");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for errors
  const router = useRouter();

  const handleHobbySelect = (hobby) => {
    setSelectedHobby(hobby);
  };
  const apiUrl = process.env.NEXT_PUBLIC_POSTQUERY_API_URL;
  // Fetch posts from the post-query endpoint
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }

        console.log(response)

        const responseData = await response.json();
        console.log('Fetched data:', responseData);

        const postData = responseData; // Access the `data` property
        if (!postData || typeof postData !== 'object') {
          throw new Error('Unexpected data format');
        }

        // Wrap the single post into an array to use map
        const postArray = Array.isArray(postData) ? postData : [postData];

        // Map to Post class instances
        const mappedPosts = postArray.map((item) => new post(item));

        console.log(mappedPosts)
        setPosts(mappedPosts);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);




  if (!isAuthenticated) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          <p className="text-lg font-semibold text-gray-700">
            We are trying to find you :)
          </p>
        </div>
    );
  }

  if (loading) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          <p className="text-lg font-semibold text-gray-700">
            Loading posts...
          </p>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen text-center space-y-4">
          <p className="text-lg font-semibold text-red-500">
            Error: {error}
          </p>
        </div>
    );
  }

  return (
      <div className="flex min-h-screen bg-background text-foreground">
        <LeftSidebar className="h-full" onHobbySelect={handleHobbySelect} />
        <main className="flex-1 p-6 overflow-auto h-full">
          <div className="max-w-6xl mx-auto">
            {selectedHobby && (
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage
                          src={`/placeholder.svg?height=48&width=48&text=${selectedHobby.name[0]}`}
                          alt={selectedHobby.name}
                      />
                      <AvatarFallback>{selectedHobby.name[0]}</AvatarFallback>
                    </Avatar>
                    <h1 className="text-3xl font-bold">{selectedHobby.name}</h1>
                  </div>
                  <p className="text-lg text-muted-foreground mb-4">
                    {selectedHobby.description}
                  </p>
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
              <Button variant="outline" onClick={() => router.push('/create-post')}>
                Create Post
              </Button>
            </div>
            <div className="space-y-6">
              {Array.isArray(posts) ? (
                  posts.map((postInstance) => (
                      <PostCard
                          key={postInstance.postId}
                          id={postInstance.postId}
                          title={postInstance.title}
                          content={postInstance.content}
                          author={postInstance.userName}
                          hobby={postInstance.hobbyName}
                          date={postInstance.createdAt}
                          images={postInstance.imageUrls}
                          comments={0} // Adjust as needed if the backend returns comment data
                          category={"nothing"} // Update if your Post class supports categories
                          likes={2} // Update if your Post class supports likes
                      />
                  ))
              ) : (
                  <p className="text-center text-muted-foreground mt-8">
                    No posts available.
                  </p>
              )}
            </div>
            {posts.length === 0 && (
                <p className="text-center text-muted-foreground mt-8">
                  No posts found for this hobby and category.
                </p>
            )}
          </div>
        </main>
      </div>
  );
}
