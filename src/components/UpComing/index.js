import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import MovieCard from '../MovieCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UpComing extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movies: [],
  }

  componentDidMount() {
    this.getUpcomingVideos()
  }

  getUpcomingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const API_KEY = '916c8a56fac61e240fbb44770fe2342b'

    try {
      const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      const response = await fetch(apiUrl)
      if (response.ok) {
        const data = await response.json()
        const formattedData = data.results.map(eachMovie => ({
          adult: eachMovie.adult,
          backdropPath: eachMovie.backdrop_path,
          genreIds: eachMovie.genre_ids,
          id: eachMovie.id,
          originalLanguage: eachMovie.original_language,
          originalTitle: eachMovie.original_title,
          overview: eachMovie.overview,
          popularity: eachMovie.popularity,
          posterPath: eachMovie.poster_path,
          releaseDate: eachMovie.release_date,
          title: eachMovie.title,
          video: eachMovie.video,
          voteAverage: eachMovie.vote_average,
          voteCount: eachMovie.vote_count,
        }))
        this.setState({
          movies: formattedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      console.log(error)
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loading-container">
      <Loader type="ThreeDots" height={50} width={50} color="#0bffff" />
    </div>
  )

  renderFailureView = () => (
    <h1 style={{color: 'orange'}}>This is a Failure View</h1>
  )

  renderSuccessView = () => {
    const {movies} = this.state
    return (
      <div className="movies-container">
        <h1 className="heading">upcoming Movies</h1>
        <ul className="movies-list-container">
          {movies.map(eachMovie => (
            <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const renderUpcomingMovies = () => {
      const {apiStatus} = this.state
      switch (apiStatus) {
        case apiStatusConstants.loading:
          return this.renderLoadingView()
        case apiStatusConstants.failure:
          return this.renderFailureView()
        case apiStatusConstants.success:
          return this.renderSuccessView()
        default:
          return null
      }
    }
    return (
      <div className="home-container">
        <Header />
        {renderUpcomingMovies()}
      </div>
    )
  }
}

export default UpComing