import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { Route, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import AddTeam from './AddTeam';
import TeamDetails from '../TeamDetails/TeamDetails.jsx';

const apiURL = process.env.REACT_APP_SUPABASE_URL;

const mockTeam = {
  id: 6,
  created_at: '2021-12-08T20:26:24.408898+00:00',
  name: 'redirect me!',
  city: 'okay',
  state: 'go',
  players: []
};

const server = setupServer(
  rest.get(
    apiURL + '/rest/v1/teams',
    (req, res, ctx) => {
      return res(ctx.json(mockTeam));
    }
  ),
  rest.post(
    apiURL + '/rest/v1/teams',
    (req, res, ctx) => {
      return res(ctx.json([mockTeam]));
    }
  )
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

it('should add a team and redirect to the team detail page', async () => {
  const history = createMemoryHistory();
  history.push('/teams/new');

  render(
    <Router history={history}>
      <Route path='/teams/new' exact>
        <AddTeam />
      </Route>
      <Route path='/teams/:id' exact component={TeamDetails} />
    </Router>
  );

  screen.getByText('Add a Team');

  const nameField = screen.getByLabelText(/name/i);
  const cityField = screen.getByLabelText(/city/i);
  const stateField = screen.getByLabelText(/state/i);
  const submitBtn = screen.getByRole('button', { name: 'Add a team' });

  userEvent.type(nameField, 'My New Team');
  userEvent.type(cityField, 'Anytown');
  userEvent.type(stateField, 'US');
  userEvent.click(submitBtn);
  
  await waitForElementToBeRemoved(() => screen.getByText(/l o a d i n g/i))

  await screen.findByText('redirect me!');
});
