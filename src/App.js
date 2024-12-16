import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import TopRated from './components/TopRated'
import MovieDetails from './components/MovieDetails'
import UpComing from './components/UpComing'
import Search from './components/Search'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/top-rated" component={TopRated} />
    <Route exact path="/upcoming" component={UpComing} />
    <Route exact path="/movie/:id" component={MovieDetails} />
    <Route exact path="/search/:searchInput" component={Search} />
  </Switch>
)

export default App
