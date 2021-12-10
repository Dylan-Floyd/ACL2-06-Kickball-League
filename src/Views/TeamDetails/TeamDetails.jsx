import React, { useEffect, useState } from 'react'
import { getTeamById } from '../../services/teams.js'
import PlayerList from '../../Components/PlayerList/PlayerList.jsx'

export default function TeamDetails({match}) {
  const { id } = match.params
  const [team, setTeam] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getTeamById(id)
      .then(res => setTeam(res))
      .finally(() => setLoading(false))
  }, [id])

  if(loading) return <h3>L O A D I N G . . .</h3>

  return (
    <div>
      <h2>{team.name}</h2>
      <h3>{team.city}, {team.state}</h3>
      <PlayerList players={team.players} />
    </div>
  )
}
