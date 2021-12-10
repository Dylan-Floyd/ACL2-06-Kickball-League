import { render, screen } from '@testing-library/react';
import TeamList from './TeamList.jsx'

it('should render a list of teams', async () => {
  render(
    <TeamList teams={[{id: 1, name: 'a team'}]} />
  );

  const playerName = await screen.findByText('a team', {
    exact: false,
  });

  expect(playerName).toBeInTheDocument();
});