import { createMemoryHistory } from 'history';
import { Route, Router } from 'react-router-dom';
import { screen, render, waitForElementToBeRemoved } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import PlayerDetails from '../PlayerDetails/PlayerDetails.jsx';
import EditPlayer from './EditPlayer.jsx';
import userEvent from '@testing-library/user-event';

const apiURL = process.env.REACT_APP_SUPABASE_URL;

const mockPlayer = {
  id: 6,
  created_at: '2021-12-08T20:26:24.408898+00:00',
  name: 'redirect me!',
  position: 'left',
  teams: { name: 'bobbers'}
};

const server = setupServer(
  rest.get(apiURL + '/rest/v1/players', (req, res, ctx) => {
    return res(ctx.json(mockPlayer));
  }),
  rest.patch(apiURL + '/rest/v1/players', (req, res, ctx) => {
    return res(ctx.json([mockPlayer]))
  })
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

it('should render the player edit form and redirect to player details after submit', async () => {
  const history = createMemoryHistory();
  history.push('/players/2/edit');

  render(
    <Router history={history}>
      <Route path='/players/:id/edit' exact component={EditPlayer} />
      <Route path='/players/:id' exact component={PlayerDetails} />
    </Router>
  )

  await screen.findByText('Edit Player');

  const nameInput = screen.getByLabelText('Name:')
  const positionInput = screen.getByLabelText('Position:');
  const submitButton = screen.getByLabelText('Add a player');
  
  userEvent.type(nameInput, 'test name');
  userEvent.type(positionInput, 'test position');
  userEvent.click(submitButton);

  const loading = await screen.findByText(/l o a d i n g/i)

  await waitForElementToBeRemoved(loading);

  const newName = screen.getByText('redirect me!');
  expect(newName).toBeInTheDocument();
})