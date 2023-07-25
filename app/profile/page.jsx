'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import  Profile from '@components/profile';

const ProfilePage = () => {
  const { data: session } = useSession();
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log('user_id', session?.user.id)
      const response = await fetch(`/api/user/${session?.user.id}/posts`);
      const data = await response.json()
      setPosts(data)
    }
    if(!session?.user.id) fetchPosts()
  }, [])

  const handleEdit = () => {

  }

  const handleDelete = async () => {

  }

  return (
    <Profile 
      name="My Profile"
      desc = 'Welcome to your presonlized profile page'
      data = {posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default ProfilePage;