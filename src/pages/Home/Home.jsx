import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// CSS
import styles from "./Home.module.css"
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

// components
import PostDetail from '../../components/PostDetail'

const Home = () => {
  const [query, setQuery] = useState("")
  const {documents: posts, loading, error} = useFetchDocuments("posts")
  
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if(query) {
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.home}>
      <h1>See our recent posts...</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input 
          type="text" 
          placeholder='... or search for tags.' 
          onChange={(e) => setQuery(e.target.value)} />
        <button className="btn btn-dark">Search</button>
      </form>

      <div>
        {loading && <p>Loading...</p>}
        {posts && posts.map((post) => (
          <PostDetail key={post.id} post={post} />
        ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Posts not found</p>
            <Link to="/posts/create" className='btn'>
              Be the first to post!
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home