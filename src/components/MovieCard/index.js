import {Link} from 'react-router-dom'

import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`
  return (
    <li className="movie-card">
      <img src={posterUrl} className="img" alt={id} />
      <div className="wrapper-div">
        <h1 className="movie-name">{title}</h1>
        <p className="rating">{`${voteAverage.toFixed(1)}/10`}</p>
      </div>
      <Link to={`/movie/${id}`} className="movie-link">
        <button type="button" className="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard
