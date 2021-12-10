import React from 'react'

export default function TeamList({teams}) {
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
