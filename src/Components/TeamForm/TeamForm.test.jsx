import { screen, render } from '@testing-library/react'
import TeamForm from './TeamForm.jsx';

it('has the correct inputs', () => {
  render(
    <TeamForm />
  )
  const nameField = screen.getByLabelText(/name/i);
  const cityField = screen.getByLabelText(/city/i);
  const stateField = screen.getByLabelText(/state/i);
  const submitButton = screen.getByLabelText('Add a team');

  expect(nameField).toBeInTheDocument();
  expect(cityField).toBeInTheDocument();
  expect(stateField).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
})