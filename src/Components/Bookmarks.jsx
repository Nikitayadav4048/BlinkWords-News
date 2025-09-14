import React from 'react'
import demoImg from '../assets/images/demo.jpg'
import './modal.css'
import './Bookmarks.css'

const Bookmarks = ({ bookmarks, onClose, onDelete }) => {
  return (
    <div className='modal-overlay'>
        <div className="modal-content">
            <span className="close-button" onClick={onClose}>
                <i className="fa-solid fa-xmark"></i>
            </span>
            <h2 className='bookmarks-heading'>Bookmarked News</h2>
            <div className="bookmarks-list">
              {bookmarks.length === 0 ? (
                <p style={{color: '#ddd', textAlign: 'center', fontSize: '1.6rem'}}>No bookmarks yet</p>
              ) : (
                bookmarks.map((bookmark, index) => (
                  <div key={index} className="bookmark-item">
                    <img src={bookmark.image || demoImg} alt="Bookmark Image" />
                    <h3>{bookmark.title}</h3>
                    <span className="delete-button" onClick={() => onDelete(bookmark)}>
                      <i className="fa-regular fa-circle-xmark"></i>
                    </span>
                  </div>
                ))
              )}
            </div>
        </div>
    </div>
  )
}

export default Bookmarks


 