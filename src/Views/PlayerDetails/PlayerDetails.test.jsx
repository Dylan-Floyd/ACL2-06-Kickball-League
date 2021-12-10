import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PlayerDetails from './PlayerDetails.jsx'

it('should fetch and render details about a player', async () => {
  render(
    <MemoryRouter>
      <PlayerDetails
        match={{ params: { id: 12 }}}
      />
    </MemoryRouter>
  );

  screen.getByText('L O A D I N G . . .');

  const playerName = await screen.findByText('Betty Grey', {
    exact: false,
  });

  expect(playerName).toBeInTheDocument();
});