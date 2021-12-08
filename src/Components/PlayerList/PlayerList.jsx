export default function PlayerList(props) {
  const { players } = props
  return (
    <div>
      <h3>Players</h3>
      <ul>
        {players?.map(player => (
          <li key={player.id}>
            <a href={`../players/${player.id}`}>
              {player.name}
            </a>
            &nbsp;({player.position})
          </li>)
        )}
      </ul>
    </div>
  )
}
