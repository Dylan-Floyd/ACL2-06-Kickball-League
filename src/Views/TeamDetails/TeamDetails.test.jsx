import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import TeamDetails from './TeamDetails.jsx';

const apiURL = process.env.REACT_APP_SUPABASE_URL;

const mockTeam = {
  id: 6,
  created_at: '2021-12-08T20:26:24.408898+00:00',
  name: 'test team',
  city: 'wow',
  state: 'state',
  teams: { name: 'bobbers'}
};

const server = setupServer(
  rest.get(apiURL + '/rest/v1/teams', (req, res, ctx) => {
    return res(ctx.json(mockTeam));
  })
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

it('should render a detailed view of an individual team', async () => {
  render(
    <MemoryRouter>
      <TeamDetails
        match={{ params: { id: '3' } }}
      />
    </MemoryRouter>
  );

  screen.getByText('L O A D I N G . . .');

  const teamName = await screen.findByText('test team', {
    exact: false,
  });

  expect(teamName).toBeInTheDocument();
});