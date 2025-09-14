import React from 'react'
import './MyBlogs.css'
import blog1 from '../assets/images/blog1.jpg'
import blog2 from '../assets/images/blog2.jpg'
import blog3 from '../assets/images/blog3.jpg'
import blog4 from '../assets/images/blog4.jpg'

const MyBlogs = ({ blogs = [], onAddBlog }) => {
  const defaultBlogs = [
    {
      id: 1,
      title: "Getting Started with React",
      excerpt: "Learn the basics of React and build your first component...",
      image: blog1,
      date: "Dec 15, 2024"
    },
    {
      id: 2,
      title: "JavaScript ES6 Features",
      excerpt: "Explore modern JavaScript features that every developer should know...",
      image: blog2,
      date: "Dec 10, 2024"
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox",
      excerpt: "Understanding when to use CSS Grid and when to use Flexbox...",
      image: blog3,
      date: "Dec 5, 2024"
    },
    {
      id: 4,
      title: "Node.js Best Practices",
      excerpt: "Tips and tricks for building scalable Node.js applications...",
      image: blog4,
      date: "Nov 28, 2024"
    }
  ]

  const allBlogs = [...blogs, ...defaultBlogs]

  return (
    <div className='myblogs'>
      <div className='blogs-header'>
        <h3>My Blogs</h3>
        <i className='fa-solid fa-pen-to-square'></i>
      </div>
      
      <div className='blogs-list'>
        {allBlogs.map(blog => (
          <div key={blog.id} className='blog-item'>
            <img src={blog.image || blog1} alt={blog.title} />
            <div className='blog-content'>
              <h4>{blog.title}</h4>
              <p>{blog.excerpt}</p>
              <span className='blog-date'>{blog.date}</span>
            </div>
          </div>
        ))}
      </div>
      
      <button className='add-blog-btn' onClick={onAddBlog}>
        <i className='fa-solid fa-plus'></i>
        Add New Blog
      </button>
    </div>
  )
}

export default MyBlogs