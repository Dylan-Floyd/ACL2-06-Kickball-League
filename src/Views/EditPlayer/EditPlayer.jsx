import React, { useEffect, useState } from 'react'
import PlayerForm from '../../Components/PlayerForm/PlayerForm.jsx';
import { getPlayerById, updatePlayerById } from '../../services/players.js';

export default function EditPlayer({ match, history }) {
  const { id } = match.params;
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlayerById(id)
      .then(res => {
        setName(res.name)
        setPosition(res.position)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [id])

  async function handleSubmit(e) {
    e.preventDefault();

    await updatePlayerById(id, { name, position });

    history.push(`/players/${id}`);
  }

  if(loading) return <h3>L O A D I N G . . .</h3>

  return (
    <fieldset>
      <label>Edit Player</label>
      <PlayerForm {...{
        name,
        position,
        handleSubmit,
        setName,
        setPosition
      }} />
    </fieldset>
  )
}
