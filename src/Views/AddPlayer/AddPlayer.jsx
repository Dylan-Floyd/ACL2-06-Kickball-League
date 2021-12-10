import React, { useState } from 'react'
import PlayerForm from '../../Components/PlayerForm/PlayerForm.jsx';
import { createPlayer } from '../../services/players.js';

export default function AddPlayer({ history }) {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    //I made team one 'Unassigned Players'
    const res = await createPlayer({ name, position, teamId: 1 });
    history.push(`/players/${res[0].id}`);
  }

  return (
    <fieldset>
      <label>Add a Player</label>
      <PlayerForm
        {...{
          name,
          position,
          handleSubmit,
          setName,
          setPosition
        }}
      />
    </fieldset>
  )
}
