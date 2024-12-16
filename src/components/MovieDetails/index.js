import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Cast from '../Cast'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: 'INITIAL',
}

class MovieDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movieDetailsData: {},
  }

  componentDidMount() {
    this.getmovieDetails()
  }

  getmovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const API_KEY = '916c8a56fac61e240fbb44770fe2342b'
    const MOVIE_ID = id
    const apiUrl = `https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&language=en-US`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const responseData = await response.json()

      const updatedData = {
        adult: responseData.responseData,
        backdropPath: responseData.backdrop_path,
        genreIds: responseData.genre_ids,
        id: responseData.id,
        originalLanguage: responseData.original_language,
        originalTitle: responseData.original_title,
        overview: responseData.overview,
        popularity: responseData.popularity,
        posterPath: responseData.poster_path,
        releaseDate: responseData.release_date,
        title: responseData.title,
        video: responseData.video,
        runtime: responseData.runtime,
        voteAverage: responseData.vote_average,
        voteCount: responseData.vote_count,
        tagline: responseData.tagline,
        genres: responseData.genres,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        movieDetailsData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" height={50} width={50} color="#0bffff" />
    </div>
  )

  renderFailureView = () => (
    <h1 style={{color: 'orange'}}>This is a Failure View</h1>
  )

  renderMovieDetails = () => {
    const {movieDetailsData} = this.state
    const {
      id,
      originalLanguage,
      originalTitle,
      overview,
      backdropPath,
      posterPath,
      releaseDate,
      title,
      video,
      runtime,
      voteAverage,
      voteCount,
      tagline,
      genres,
    } = movieDetailsData

    const imgUrl = `https://image.tmdb.org/t/p/w500/${backdropPath}`
    const imgUrlLg = `https://image.tmdb.org/t/p/w500/${posterPath}`

    return (
      <div className="specific-container">
        <img className="specific-img-sm" src={imgUrl} alt="specific-img" />
        <img className="specific-img-lg" src={imgUrlLg} alt="specific-img" />
        <div className="content-container">
          <h1 className="movie-name">{title}</h1>
          <p className="tag-line">{tagline}</p>
          <p className="description">{overview}</p>
          <div className="wrapper">
            <p className="movie-rating">IMDB {voteAverage.toFixed(1)}</p>
            <p className="movie-rating">{runtime} min</p>
            <p className="date">{releaseDate.split('-')[0]}</p>
            <p className="language">{originalLanguage.toUpperCase()}</p>
          </div>
          <ul className="genre-wrapper">
            {genres.map(eachGenre => (
              <li className="genre-name-container">
                <p className="genre-name">{eachGenre.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="cast">Cast</h1>
          <Cast id={id} />
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    const renderMovieDetailsBasedOnApiStatus = () => {
      switch (apiStatus) {
        case apiStatusConstants.success:
          return this.renderMovieDetails()
        case apiStatusConstants.failure:
          return this.renderFailureView()
        case apiStatusConstants.loading:
          return this.renderLoadingView()
        default:
          return null
      }
    }
    return (
      <div className="movie-details-container">
        <Header />
        {renderMovieDetailsBasedOnApiStatus()}
      </div>
    )
  }
}

export default MovieDetails
