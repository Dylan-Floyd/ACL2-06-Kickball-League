import { render, screen } from '@testing-library/react';
import PlayerList from './PlayerList.jsx'

it('should render a list of players', async () => {
  render(
    <PlayerList players={[{id: 1, name: 'bob', position: 'left'}]} />
  );

  const playerName = await screen.findByText('bob', {
    exact: false,
  });

  expect(playerName).toBeInTheDocument();
});