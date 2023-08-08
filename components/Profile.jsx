import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard';
import { useSession } from 'next-auth/react';

const Profile = ({name, userId , data, handleEdit, handleDelete}) => {
  const { data: session } = useSession();

  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>
          {name}
        </span>  
      </h1>
      <p className='desc text-left'>{session?.user.id === userId ? 'Welcome to your personalized profile page' : `Welcome to ${name} personalized page. Explore ${name}'s exceptional prompts and be inspired by the power of their imagination.`}</p>
      <div className='mt-10 prompt_layout'>
        {data.map((post) => (
          <PromptCard 
            key={post._id}
            post={post}
            handleEdit = {() => handleEdit && handleEdit(post)}
            handleDelete = {() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile