import { screen, render } from '@testing-library/react'
import PlayerForm from './PlayerForm.jsx'

it('has the correct inputs', () => {
  render(
    <PlayerForm />
  )
  const nameField = screen.getByLabelText(/name/i);
  const positionField = screen.getByLabelText(/position/i);
  const submitButton = screen.getByLabelText('Add a player');

  expect(nameField).toBeInTheDocument();
  expect(positionField).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
})