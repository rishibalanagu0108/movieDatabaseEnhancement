import {useState} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

const Header = () => {
  const [isShowMenu, setToggle] = useState(false)
  const [searchInput, changeSearchInput] = useState('')
  const toggleMenuBtn = () => {
    setToggle(prevState => !prevState)
  }

  const onEditSearch = event => {
    changeSearchInput(event.target.value)
  }

  const onClickSearch = () => {
    console.log(searchInput)
    changeSearchInput('')
  }

  return (
    <>
      <nav className="nav-bar">
        <Link to="/" className="nav-link">
          <h1 className="logo-name">movieDB</h1>
        </Link>
        <div className="header-nav-search-container">
          <input
            type="text"
            className="nav-search-field"
            placeholder="Search for movies"
            onChange={onEditSearch}
          />
          <Link to={`/search/${searchInput}`}>
            <button
              className="nav-button"
              type="button"
              onClick={onClickSearch}
            >
              Search
            </button>
          </Link>
        </div>
        <div className="nav-items-lg">
          <Link to="/" className="link">
            <p className="item-lg">Popular</p>
          </Link>
          <Link to="/top-rated" className="link">
            <p className="item-lg">Top Rated</p>
          </Link>
          <Link to="/upcoming" className="link">
            <p className="item-lg">Upcoming</p>
          </Link>
        </div>
        {!isShowMenu ? (
          <button type="button" className="menu-btn" onClick={toggleMenuBtn}>
            Show
          </button>
        ) : (
          <button type="button" className="menu-btn" onClick={toggleMenuBtn}>
            Hide
          </button>
        )}
      </nav>

      {isShowMenu && (
        <div className="menu-div">
          <div className="nav-items-sm">
            <Link to="/" className="route-link">
              <p className="item">Home</p>
            </Link>
            <Link to="/top-rated" className="route-link">
              <p className="item">Top Rated</p>
            </Link>
            <Link to="/upcoming" className="route-link">
              <p className="item">Upcoming</p>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
