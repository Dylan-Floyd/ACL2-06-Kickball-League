import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TeamDetails from './TeamDetails.jsx';

it('should render a detailed view of an individual team', async () => {
  render(
    <MemoryRouter>
      <TeamDetails
        match={{ params: { id: '3' } }}
      />
    </MemoryRouter>
  );

  screen.getByText('L O A D I N G . . .');

  const teamName = await screen.findByText('Lakeville Thunderfeet', {
    exact: false,
  });

  expect(teamName).toBeInTheDocument();
});