import React, { useEffect } from 'react'
import styles from "./EditPost.module.css"

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const EditPost = () => {
  const {id} = useParams()
  const {document:post} = useFetchDocument("posts", id)

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)
      const textTags = post.tagsArray.join(", ")
      setTags(textTags)
    }
  }, [post])

  const {user} = useAuthValue()

  const {updateDocument, response} = useUpdateDocument("posts")

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

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id, data)

    // redirect to dashboard
    navigate("/dashboard")
  }

  return (
    <div className={styles.edit_post}>
      {post && 
      <>
        <h2>Edit Post: {post.title}</h2>
        <p>Edit and write what you want and share your ideas!</p>
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
          <p className={styles.preview_title}>Image preview:</p>
          <img className={styles.preview_image} src={post.image} alt={post.title} />
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
      </>}
    </div>
  )
}

export default EditPost