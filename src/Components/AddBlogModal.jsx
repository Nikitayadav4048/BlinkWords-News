import React, { useState } from 'react'
import './modal.css'
import './AddBlogModal.css'

const AddBlogModal = ({ show, onClose, onAddBlog }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')

  if (!show) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim() && content.trim()) {
      const newBlog = {
        id: Date.now(),
        title: title.trim(),
        excerpt: content.trim().substring(0, 100) + '...',
        content: content.trim(),
        image: image || null,
        date: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })
      }
      onAddBlog(newBlog)
      setTitle('')
      setContent('')
      setImage('')
      onClose()
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content add-blog-modal">
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        
        <h2>Add New Blog</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title..."
              required
            />
          </div>
          
          <div className="form-group">
            <label>Image URL (optional)</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL..."
            />
          </div>
          
          <div className="form-group">
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content..."
              rows="8"
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBlogModal