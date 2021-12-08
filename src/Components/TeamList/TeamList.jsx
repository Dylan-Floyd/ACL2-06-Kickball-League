import React from 'react'

export default function TeamList({teams}) {
  if(!teams?.map) return <h1>SOMETHING BROKE SORRY</h1>
  return (
    <div>
      <ul>
        {teams.map(team => (
          <li key={team.id}>
            <a href={`./teams/${team.id}`}>{team.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
