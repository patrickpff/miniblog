import React from 'react'

// css
import styles from "./About.module.css"
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className={styles.about}>
      <h2>About Mini <span>Blog</span></h2>
      <p>
        This project consist in a blog using React in front-end and Firebase at the back-end.
        For more information, access the README.MD.
      </p>
      <Link to="/posts/create" className="btn">Create Post</Link>
    </div>
  )
}

export default About