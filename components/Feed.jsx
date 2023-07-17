'use client'
import React, { useEffect, useState } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>

    </div>
  )
}

const Feed = () => {
  const [data , setData] = useState([])
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const fetchPosts =async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json()
    }
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          placeholder='Search for tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data = {[]}
        handleTagClick={() => {}}
      />

    </section>
  )
}

export default Feed