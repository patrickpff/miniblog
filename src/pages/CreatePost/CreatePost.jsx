import React from 'react'
import styles from "./CreatePost.module.css"

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import {useInsertDocument} from '../../hooks/useInsertDocument'

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const {user} = useAuthValue()

  const {insertDocument, response} = useInsertDocument("posts")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    // validate image URL
    try {
      new URL(image)
    } catch (error) {
      setFormError("The image field needs must contain a URL.")
    }

    // create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // check all the fields
    if (!title || !image || !tags || !body) {
      setFormError("Please, fill all the fields!")
    }

    if(formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    // redirect home page
    navigate("/")
  }

  return (
    <div className={styles.create_post}>
        <h2>Create Post</h2>
        <p>Write what you want and share your ideas!</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Title:</span>
            <input 
              type="text" 
              name="title" 
              required 
              placeholder='Think of a nice title...' 
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </label>
          <label>
            <span>URL da imagem:</span>
            <input 
              type="text" 
              name="image" 
              required 
              placeholder='Insert a link to an image that represents your post' 
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
          </label>
          <label>
            <span>Content:</span>
            <textarea 
              name="body" 
              required
              placeholder='Insert the content of your post'
              onChange={(e) => setBody(e.target.value)}
              value={body}
            ></textarea>
          </label>
          <label>
            <span>Tags:</span>
            <input 
              type="tags" 
              name="tags" 
              required 
              placeholder='Insert tags separated by comma (ex. food,healthy)' 
              onChange={(e) => setTags(e.target.value)}
              value={tags}
            />
          </label>

          {!response.loading && <button className="btn">Register</button>}
          {response.loading && <button className="btn" disabled>Waiting...</button>}
          {response.error && <p className='error'>{response.error}</p> }
          {formError && <p className='error'>{formError}</p> }
          
        </form>
    </div>
  )
}

export default CreatePost