import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { deletePlayerById, getPlayerById } from '../../services/players.js'

export default function PlayerDetails({ match, history }) {
  const { id } = match.params;
  const [player, setPlayer] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getPlayerById(id)
      .then(res => setPlayer(res))
      .finally(() => setLoading(false))
  }, [id])

  async function deletePlayer(e) {
    e.preventDefault();
    await deletePlayerById(id);
    history.push('/players');
  }

  if(loading) return <h3>L O A D I N G . . .</h3>

  return (
    <div>
      <h3>{player.name}</h3>
      Plays {player.position} for {player.teams.name}
      <br />
      <Link to={`/players/${id}/edit`}>Edit Player</Link>
      <br />
      <a href='/players' onClick={(e) => deletePlayer(e)}>Delete Player</a>
    </div>
  )
}
