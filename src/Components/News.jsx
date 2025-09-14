import React, { useEffect, useState } from 'react'
import Weather from './Weather'
import Calendar from './Calendar'
import './News.css'
import userImg from '../assets/images/user2.jpg'
import noImg from '../assets/images/no-img.png'
import axios from 'axios'
import NewsModal  from './NewsModal'
import Bookmarks  from './Bookmarks'
import MyBlogs from './MyBlogs'
import AddBlogModal from './AddBlogModal'

const categories = [
  "general", "world", "business", "technology",
  "entertainment", "sports", "science", "health", "nation"
]

const News = () => {
  const [headline, setHeadline] = useState(null)
  const [news, setNews] = useState([])
  const [selectedCategories, setSelectedCategories] = useState("general")

  const [searchInput , setSearchInput] = useState("")
   const [searchQuery , setSearchQuery] = useState("")
  const [showModel , setShowModal] = useState(false)
  const [selectedArticle , setSelectedArticle] = useState(null)  
  // const [loading, setLoading] = useState(false)

  const [bookmark , setBookmark] = useState([]) 
  const [showBookmarkModel , setshowBookmarkModel] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [showAddBlogModal, setShowAddBlogModal] = useState(false)  

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategories}&lang=en&apikey=940bf2b2e0ab114d3c8993132f8bd542`

          if(searchQuery){
            url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=940bf2b2e0ab114d3c8993132f8bd542`
          }
     
        const response = await axios.get(url)
        const fetchedNews = response.data.articles

        fetchedNews.forEach((article) => {
          if (!article.image) {
            article.image = noImg
          }
        })

        setHeadline(fetchedNews[0])
        setNews(fetchedNews.slice(1, 7))
      } catch (error) {
        console.error("Error fetching news:", error)
      }
    }

    fetchNews()
  }, [selectedCategories , searchQuery])

  const handleCategoriesClick = (e, category) => {
    e.preventDefault()
    setSelectedCategories(category)
  }


  const handleSearch = (e) => {
       e.preventDefault()
       setSearchQuery(searchInput)
       setSearchInput('')
  }

  const handleArticleClick = (article) => {
    setSelectedArticle(article)
    setShowModal(true)


  }

  const handleBookmarkClick = (article) => {
    setBookmark((prevBookmarks) => {
      const updatedBookmarks = prevBookmarks.find((bookmark) => bookmark.title == article.title) ? prevBookmarks.filter((bookmark) => bookmark.title != article.title) : [...prevBookmarks , article] 
      return updatedBookmarks 
    })
  }

  const handleAddBlog = (newBlog) => {
    setBlogs(prev => [newBlog, ...prev])
  }
   
  return (
    <div className='news'>
      <header className="news-header">
        <h1 className='logo'>BlinkWords</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input type="text" placeholder='Search News...' value={searchInput} onChange={(e) => setSearchInput(e.target.value) } />
            <button type='submit'>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>

      <div className="news-content">
        <div className="navbar">
          <div className="user">
            <img src={userImg} alt="User Image" />
            <p>Tanya Blogs</p>
          </div>
          <nav className="categories">
            <h1 className='nav-heading'>Categories</h1>
            <div className="nav-links">
              {categories.map((category) => (
                <a
                  href="#"
                  key={category}
                  className='nav-link'
                  onClick={(e) => handleCategoriesClick(e, category)}
                >
                  {category}
                </a>
              ))}
              <a href="#" className='nav-link' onClick={(e) => {
                e.preventDefault()
                setshowBookmarkModel(true)
              }}>
                Bookmarks <i className="fa-regular fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>

        <div className="news-section">
          {headline && (
            <div className="headline" onClick={() => {
              handleArticleClick(headline)
            }}>
              <img src={headline.image || noImg} alt={headline.title} />
              <h2 className="headline-title">
                {headline.title}
                <i 
                  className={`fa-${bookmark.find(b => b.title === headline.title) ? 'solid' : 'regular'} fa-bookmark bookmark`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleBookmarkClick(headline)
                  }}
                ></i>
              </h2>
            </div>
          )}
          <div className="news-grid">
            {news.map((article, index) => (
              <div key={index} className="news-grid-item" onClick={() => {
              handleArticleClick(article)
            }}>
                <img src={article.image || noImg} alt={article.title} />
                <h3>
                  {article.title}
                  <i 
                    className={`fa-${bookmark.find(b => b.title === article.title) ? 'solid' : 'regular'} fa-bookmark bookmark`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleBookmarkClick(article)
                    }}
                  ></i>
                </h3>
              </div>
            ))}
          </div>
        </div>
          <NewsModal show={showModel} article={selectedArticle}  onClose = {() => {
            setShowModal(false)
          }}/>
          {showBookmarkModel && (
            <Bookmarks 
              bookmarks={bookmark} 
              onClose={() => setshowBookmarkModel(false)}
              onDelete={handleBookmarkClick}
            />
          )}
          <AddBlogModal 
            show={showAddBlogModal}
            onClose={() => setShowAddBlogModal(false)}
            onAddBlog={handleAddBlog}
          />
        <MyBlogs 
          blogs={blogs}
          onAddBlog={() => setShowAddBlogModal(true)}
        />

        <div className="weather-calendar">
          <Weather />
          <Calendar />
        </div>
      </div>

      <footer className="news-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Blink-Words</h3>
            <p>Your modern news and blog platform</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <i className="fab fa-twitter"></i>
              <i className="fab fa-facebook"></i>
              <i className="fab fa-instagram"></i>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Blink-Words. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default News