'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import  Profile from '@components/profile';

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (session?.user.id) {
        console.log('user_id', session?.user.id);
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      }
    };
    fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id= ${post._id}`)
  }

  const handleDelete = async (post) => {
    const confirmDelete = confirm('Are you sure you want to delete this post?')
    if(confirmDelete) {
      try {
        const response = await fetch(`api/prompt/${post._id.toString()}`, {
          method:'DELETE'
        })
        if(response.ok) {
          const filteredPosts = posts.filter((p) => 
            p._id !==post._id
          )
          setPosts(filteredPosts)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Profile 
      name={session?.user.name}
      desc = 'Welcome to your personalized profile page'
      data = {posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default ProfilePage;