import { createMemoryHistory } from 'history';
import { Route, Router } from 'react-router-dom';
import { screen, render, waitForElementToBeRemoved } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import TeamDetails from '../TeamDetails/TeamDetails.jsx';
import EditTeam from './EditTeam.jsx';

const apiURL = process.env.REACT_APP_SUPABASE_URL;

const mockTeam = {
  id: 6,
  created_at: '2021-12-08T20:26:24.408898+00:00',
  name: 'redirect me!',
  city: 'wow',
  state: 'state',
  teams: { name: 'bobbers'}
};

const server = setupServer(
  rest.get(apiURL + '/rest/v1/teams', (req, res, ctx) => {
    return res(ctx.json(mockTeam));
  }),
  rest.patch(apiURL + '/rest/v1/teams', (req, res, ctx) => {
    return res(ctx.json([mockTeam]))
  })
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

it('should render the team edit form and redirect to team details after submit', async () => {
  const history = createMemoryHistory();
  history.push('/teams/2/edit');

  render(
    <Router history={history}>
      <Route path='/teams/:id/edit' exact component={EditTeam} />
      <Route path='/teams/:id' exact component={TeamDetails} />
    </Router>
  )

  await screen.findByText('Edit Team');

  const nameInput = screen.getByLabelText('Name:')
  const positionInput = screen.getByLabelText('City:');
  const stateInput = screen.getByLabelText('State:');
  const submitButton = screen.getByLabelText('Add a team');
  
  userEvent.type(nameInput, 'test name');
  userEvent.type(positionInput, 'test position');
  userEvent.type(stateInput, 'test state');
  userEvent.click(submitButton);

  const loading = await screen.findByText(/l o a d i n g/i)

  await waitForElementToBeRemoved(loading);

  const newName = screen.getByText('redirect me!');
  expect(newName).toBeInTheDocument();
})