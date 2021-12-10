import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import PlayerDetails from './Views/PlayerDetails/PlayerDetails.jsx';
import TeamDetails from './Views/TeamDetails/TeamDetails.jsx';
import TeamsView from './Views/TeamsView/TeamsView.jsx';
import PlayerView from './Views/PlayersView/PlayersView.jsx';
import AddTeam from './Views/AddTeam/AddTeam.jsx';
import NotFoundView from './Views/NotFound/NotFoundView.jsx';
import EditTeam from './Views/EditTeam/EditTeam.jsx';
import EditPlayer from './Views/EditPlayer/EditPlayer.jsx';

import './App.css';
import AddPlayer from './Views/AddPlayer/AddPlayer.jsx';

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
          <Route path='/teams/new' exact render={routeProps => <AddTeam {...routeProps} />} />
          <Route path='/teams/:id' exact render={routeProps => <TeamDetails {...routeProps} />} />
          <Route path='/teams/:id/edit' exact render={routeProps => <EditTeam {...routeProps} />} />
          <Route path='/players' exact>
            <PlayerView />
          </Route>
          <Route path='/players/new' exact render={routeProps => <AddPlayer {...routeProps} />} />
          <Route path='/players/:id' exact render={routeProps => <PlayerDetails {...routeProps} />} />
          <Route path='/players/:id/edit' exact render={routeProps => <EditPlayer {...routeProps} />} />
          <Route path='/' exact>
            <h1>PNW Kickball</h1>
          </Route>
          <Route path='*'>
            <NotFoundView />
          </Route>
        </Switch>
      </Router>
    
    </div>
  );
}

export default App;
