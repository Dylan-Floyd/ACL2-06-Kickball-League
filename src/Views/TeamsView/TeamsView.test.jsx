import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TeamsView from './TeamsView.jsx'

it('should fetch and render a list of teams', async () => {
  render(
    <MemoryRouter>
      <TeamsView/>
    </MemoryRouter>
  );

  screen.getByText('L O A D I N G . . .');

  const playerName = await screen.findByText('Lakeville Thunderfeet', {
    exact: false,
  });

  expect(playerName).toBeInTheDocument();
});