import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TeamList from '../../Components/TeamList/TeamList.jsx'
import { getTeams } from '../../services/teams.js'

export default function TeamsView() {
  const [loading, setLoading] = useState(false)
  const [teams, setTeams] = useState([])

  useEffect(() => {
    setLoading(true)
    getTeams()
      .then(res => setTeams(res))
      .finally(() => setLoading(false))
  }, [])

  if(loading) return <h3>L O A D I N G . . .</h3>
  return (
    <>
      <Link to="/teams/new">Add a team</Link>
      <TeamList teams={teams} />
    </>
  )
}
