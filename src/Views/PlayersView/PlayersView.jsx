import React, { useEffect, useState } from 'react'
import PlayerList from '../../Components/PlayerList/PlayerList.jsx'
import { getPlayers } from '../../services/players.js'

export default function PlayerView() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getPlayers()
      .then(res => setPlayers(res))
      .finally(() => setLoading(false))
  }, [])

  if(loading) return <h3>L O A D I N G . . .</h3>

  return (
    <div>
      <PlayerList players={players}/>
    </div>
  )
}
