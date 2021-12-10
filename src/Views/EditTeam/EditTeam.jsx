import React, { useEffect, useState } from 'react'
import TeamForm from '../../Components/TeamForm/TeamForm.jsx';
import { getTeamById, updateTeamById } from '../../services/teams.js';

export default function EditTeam({ match, history }) {
  const { id } = match.params;
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    getTeamById(id)
      .then((res) => {
        setName(res.name);
        setCity(res.city)
        setState(res.state)
      })
      .catch(err => console.error(err));
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await updateTeamById(id, { name, city, state })

    history.push(`/teams/${res[0].id}`);
  }

  return (
    <fieldset>
      <label>Edit Team</label>
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
