'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter,useSearchParams } from 'next/navigation';


import Form from '@components/Form';

const UpdatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt:'',
    tag:''
  })
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id')
  const id = promptId.trim()
  
  useEffect(() => {
    if(!session?.user) {
      router.push('/')
    }

    const getPromptDetail = async() => {
      const response = await fetch(`/api/prompt/${id}`);
      const data = await response.json();
      setPost((prevPost) => ({
        ...prevPost,
        prompt: data.prompt,
        tag: data.tag,
      }));
    }
    getPromptDetail()
  }, [promptId])

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch (`api/prompt/${id}`,{
        method:'PUT',
        body:JSON.stringify({
          prompt:post.prompt,
          tag:post.tag
        })
      })
      if(response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form 
      type='Update'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePrompt