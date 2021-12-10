import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PlayersView from './PlayersView.jsx'

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