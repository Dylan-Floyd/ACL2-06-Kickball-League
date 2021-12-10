import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { Route, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import AddPlayer from './AddPlayer.jsx';
import PlayerDetails from '../PlayerDetails/PlayerDetails.jsx';

const apiURL = process.env.REACT_APP_SUPABASE_URL;

const mockPlayer = {
  id: 6,
  created_at: '2021-12-08T20:26:24.408898+00:00',
  name: 'redirect me!',
  position: 'left',
  teams: { name: 'bobbers'}
};

const server = setupServer(
  rest.get(
    apiURL + '/rest/v1/players',
    (req, res, ctx) => {
      return res(ctx.json(mockPlayer));
    }
  ),
  rest.post(
    apiURL + '/rest/v1/players',
    (req, res, ctx) => {
      return res(ctx.json([mockPlayer]));
    }
  )
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

it('should add a player and redirect to the player detail page', async () => {
  const history = createMemoryHistory();
  history.push('/players/new');

  render(
    <Router history={history}>
      <Route path='/players/new' exact component={AddPlayer} />
      <Route path='/players/:id' exact component={PlayerDetails} />
    </Router>
  );

  screen.getByText('Add a Player');

  const nameField = screen.getByLabelText(/name/i);
  const positionField = screen.getByLabelText(/position/i);
  const submitBtn = screen.getByRole('button', { name: 'Add a player' });

  userEvent.type(nameField, 'My New Player');
  userEvent.type(positionField, 'Anytown');
  userEvent.click(submitBtn);
  
  await waitForElementToBeRemoved(() => screen.getByText(/l o a d i n g/i));

  await screen.findByText('redirect me!');
});
