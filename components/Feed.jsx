'use client'
import React, { useEffect, useState } from 'react'

import PromptCard from './PromptCard'
import { data } from 'autoprefixer'

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={() => handleTagClick(post.tag)}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([])
  const [searchResults , setSearchResults] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json()
      setPosts(data)
    }
    fetchPosts()
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'i');

    return posts.filter(
      (item) => (
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
      )
    )
  } 

  const handleSearchText = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = filterPrompts(e.target.value);
        setSearchResults(searchResults);
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag)
  }

  useEffect(() => {
    const searchResult =  filterPrompts(searchText)
    setSearchResults(searchResult)
  }, [searchText])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          placeholder='Search for tag or username'
          value={searchText}
          onChange={handleSearchText}
          required
          className='search_input peer'
        />
      </form>

        <PromptCardList data={searchResults.length !==0 ? searchResults : posts} handleTagClick={handleTagClick} />

    </section>
  )
}

export default Feed