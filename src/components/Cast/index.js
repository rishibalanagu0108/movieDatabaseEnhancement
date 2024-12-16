import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class Cast extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    castData: [],
  }

  componentDidMount() {
    this.getCastDetails()
  }

  getCastDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {id} = this.props
    const MOVIE_ID = id
    const API_KEY = '916c8a56fac61e240fbb44770fe2342b'

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${MOVIE_ID}/credits?api_key=${API_KEY}&language=en-US`,
      )

      if (response.ok) {
        const responseCast = await response.json()

        const updatedData = responseCast.cast.map(each => ({
          character: each.character,
          knownForDepartment: each.known_for_department,
          originalName: each.original_name,
          profilePath: each.profile_path,
        }))

        this.setState({
          apiStatus: apiStatusConstants.success,
          castData: updatedData,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      console.error(error)
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

  renderCastDetails = () => {
    const {castData} = this.state
    // console.log(castData)
    console.log(castData)
    return (
      <ul className="cast-list-container">
        {castData.map((each, index) => (
          <li key={each.profilePath || `cast-${index}`} className="cast-item">
            <img
              className="cast-img"
              src={`https://image.tmdb.org/t/p/w500/${each.profilePath}`}
              alt="cast-img"
            />
            <div className="cast-wrapper">
              <p className="character-name">{each.character}</p>
              <p className="original-name">{each.originalName}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderDiffrentViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderCastDetails()
      default:
        return null
    }
  }

  render() {
    return <div className="cast-container">{this.renderDiffrentViews()}</div>
  }
}

export default Cast
