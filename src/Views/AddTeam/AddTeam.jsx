import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import TeamForm from '../../Components/TeamForm/TeamForm.jsx'
import { createTeam } from '../../services/teams.js';

export default function AddTeam() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createTeam({name, city, state});

    history.push(`/teams/${res[0].id}`);
  }

  return (
    <fieldset>
      <label>Add a Team</label>
      <TeamForm
        {...{
          name,
          city,
          state,
          handleSubmit,
          setName,
          setCity,
          setState
        }}
      />
    </fieldset>
  )
}
