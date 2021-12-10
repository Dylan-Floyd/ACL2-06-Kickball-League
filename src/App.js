import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import './App.css';
import PlayerDetails from './Views/PlayerDetails/PlayerDetails.jsx';
import TeamDetails from './Views/TeamDetails/TeamDetails.jsx';
import TeamsView from './Views/TeamsView/TeamsView.jsx';
import PlayerView from './Views/PlayersView/PlayersView.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/teams'>Teams</Link>
            <Link to='/players'>Players</Link>
          </nav>
        </header>

        <Switch>
          <Route path='/teams' exact>
            <TeamsView />
          </Route>
          <Route path='/teams/:id' exact render={routeProps => <TeamDetails {...routeProps} />} />
          <Route path='/players' exact>
            <PlayerView />
          </Route>
          <Route path='/players/:id' exact render={routeProps => <PlayerDetails {...routeProps} />} />
          <Route path='/'>
            <h1>PNW Kickball</h1>
          </Route>
        </Switch>
      </Router>
    
    </div>
  );
}

export default App;
