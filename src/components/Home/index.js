import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  loading: 'LOADING',
  initial: 'INITIAL',
  failure: 'FAILURE',
}
class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movies: [],
  }

  componentDidMount() {
    this.getMovieVideos()
  }

  getMovieVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const API_KEY = '916c8a56fac61e240fbb44770fe2342b'

    try {
      const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`

      const response = await fetch(apiUrl)

      if (response.ok) {
        const data = await response.json()

        console.log(data)

        this.setState({
          apiStatus: apiStatusConstants.success,

          movies: data.results,
        })
      } else {
        console.error('Failed to fetch movies')

        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loading-container">
      <Loader type="ThreeDots" height="50" width="50" color="#0b69ff" />
    </div>
  )

  renderFailureView = () => {
    return <h1 style={{color: 'orange'}}>This is the Failure View</h1>
  }

  renderSuccessView = () => {
    const {movies} = this.state
    console.log(movies)
    return <h1 style={{color: 'orange'}}>This is the Success View</h1>
  }

  render() {
    const {apiStatus} = this.state
    const renderMovieDetails = () => {
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
        {renderMovieDetails()}
      </div>
    )
  }
}

export default Home
