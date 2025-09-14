import React from 'react';
import demoImg from '../assets/images/demo.jpg';
import './NewsModal.css';
import './modal.css'

const NewsModal = ({ show, article, onClose }) => {
  if (!show) {
    return null;
  }

  const formattedDate = article?.publishedAt
    ? new Date(article.publishedAt).toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Date not available';

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>

        {article && (
          <>
            <img
              src={article.image || demoImg}
              alt={article.title || 'Article Image'}
              className="modal-image"
            />
            <h2 className="modal-title">{article.title}</h2>
            <p className="modal-source">Source: {article.source?.name || 'Unknown'}</p>
            <p className="modal-date">{formattedDate}</p>
            <p className="modal-content-text">
              {article.content || 'No summary available for this article.'}
            </p>
            <a
              href={article.url || '#'}
              className="read-more-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsModal;