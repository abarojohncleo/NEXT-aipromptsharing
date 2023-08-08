'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';



const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  const { data: session } = useSession();
  const [creatorData , setCreatorData] = useState(null)
  const [copy, setCopy] = useState('')
  const path = usePathname()
  
  useEffect(() => {
    if(post && post.creator) {
      setCreatorData(post.creator)
    }
  }, [post, session?.user.id])

  if(!creatorData) {
    return (
      <div>Loading ...</div>
    )
  }

  const handleCopy = () => {
    setCopy(post.prompt)
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopy(''), 3000)
  }

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <Link href={`/profile/?id=${post.creator._id}&name=${post.creator.username}`}>
          <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
            <Image 
              src={post.creator.image}
              alt='user_image'
              width={40}
              height={40}
              className='rounded-full object-contain'
            />
            <div className='flex flex-col'>
              <h3 className='font-satoshi font-semibold text-gray-900'>
                {post.creator.username}
              </h3>
              <p className='font-inter text-sm text-gray-500'>
                {post.creator.email}
              </p>
            </div>
          </div>
        </Link>
        <div className='copy_btn' onClick={handleCopy}>
          <Image 
            src={copy === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>
        {post.prompt}
      </p>
      <p className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && path === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p 
            className='font-inter text-sm green_gradient cursor-pointer' 
            onClick={handleEdit}>
            Edit
          </p>
          <p 
            className='font-inter text-sm orange_gradient cursor-pointer' 
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard