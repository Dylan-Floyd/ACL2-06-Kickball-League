import React, { useEffect, useState } from 'react'
import { deleteTeamById, getTeamById } from '../../services/teams.js'
import PlayerList from '../../Components/PlayerList/PlayerList.jsx'
import { Link } from 'react-router-dom'

export default function TeamDetails({ match, history }) {
  const { id } = match.params
  const [team, setTeam] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getTeamById(id)
      .then(res => setTeam(res))
      .finally(() => setLoading(false))
  }, [id])

  function deleteTeam(e) {
    e.preventDefault();
    deleteTeamById(id).finally(() => history.push('/teams'))
  }
  if(loading) return <h3>L O A D I N G . . .</h3>

  return (
    <div>
      <h2>{team.name}</h2>
      <h3>{team.city}, {team.state}</h3>
      <Link to={`/teams/${id}/edit`}>Edit Team</Link>
      <a href='/teams' onClick={(e) => deleteTeam(e)}>&nbsp;Delete Team</a>
      <PlayerList players={team.players} />
    </div>
  )
}
