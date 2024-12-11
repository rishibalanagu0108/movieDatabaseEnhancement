import {useState} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

const Header = () => {
  const [isShowMenu, setToggle] = useState(false)
  const toggleMenuBtn = () => {
    setToggle(prevState => !prevState)
  }

  return (
    <>
      <nav className="nav-bar">
        <Link to="/" className="nav-link">
          <h1 className="logo-name">
            Netflix <span className="logo-high">Baap</span>
          </h1>
        </Link>
        <div className="nav-items-lg">
          <Link to="/" className="link">
            <p className="item-lg">Home</p>
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
