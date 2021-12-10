import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import PlayersView from './PlayersView.jsx'

const apiURL = process.env.REACT_APP_SUPABASE_URL;

const mockPlayer = {
  id: 6,
  created_at: '2021-12-08T20:26:24.408898+00:00',
  name: 'Betty Grey',
  position: 'left',
  teams: { name: 'bobbers'}
};

const server = setupServer(
  rest.get(apiURL + '/rest/v1/players', (req, res, ctx) => {
    return res(ctx.json([mockPlayer]));
  })
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});
it('should fetch and render a list of all players', async () => {
  render(
    <MemoryRouter>
      <PlayersView
      />
    </MemoryRouter>
  );

  screen.getByText('L O A D I N G . . .');

  const playerName = await screen.findByText('Betty Grey', {
    exact: false,
  });

  expect(playerName).toBeInTheDocument();
});