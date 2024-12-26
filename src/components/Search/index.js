import {Component} from 'react'

import Header from '../Header'
import MovieCard from '../MovieCard'
import './index.css'

class Search extends Component {
  state = {
    searchResults: undefined,
  }

  componentDidMount() {
    this.getSearchResults()
  }

  getSearchResults = async () => {
    const API_KEY = '916c8a56fac61e240fbb44770fe2342b'
    const {match} = this.props
    const {params} = match
    const {searchInput} = params
    const MOVIE_NAME = searchInput
    try {
      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${MOVIE_NAME}&page=1`
      const response = await fetch(apiUrl)
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
      this.setState({searchResults: formattedData})
    } catch (error) {
      console.log(error)
    }
  }

  renderSearchResults = () => {
    const {searchResults} = this.state
    const searchResultsAvailable = searchResults && searchResults.length > 0
    return (
      <div className="movie-container">
        <h1 className="heading">Search</h1>
        <ul className="movies-list-container">
          {searchResultsAvailable &&
            searchResults.map(eachMovie => (
              <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
            ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        {this.renderSearchResults()}
      </div>
    )
  }
}

export default Search
