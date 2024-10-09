import React from 'react'

// css
import styles from "./About.module.css"
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className={styles.about}>
      <h2>About Mini <span>Blog</span></h2>
      <p>
        A simple blogging platform built with React 
        and Firebase that allows users to create, edit, and delete 
        posts. This project demonstrates basic CRUD operations, 
        Firebase authentication, and Firestore database integration.
      </p>
      <p>For more information, access the README.md.</p>
      <Link to="/posts/create" className="btn">Create Post</Link>
    </div>
  )
}

export default About