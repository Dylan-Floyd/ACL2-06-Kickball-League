import React, { useEffect, useState } from 'react'
import { getPlayerById } from '../../services/players.js'

export default function PlayerDetails({match}) {
  const { id } = match.params;
  const [player, setPlayer] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getPlayerById(id)
      .then(res => setPlayer(res))
      .finally(() => setLoading(false))
  }, [id])

  if(loading) return <h3>L O A D I N G . . .</h3>

  return (
    <div>
      <h3>{player.name}</h3>
      Plays {player.position} for {player.teams.name}
    </div>
  )
}
