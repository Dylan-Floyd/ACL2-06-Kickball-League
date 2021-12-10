import React from 'react'

export default function PlayerForm({
  name,
  position,
  handleSubmit,
  setName,
  setPosition
}) {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          id='name'
          name='name'
          type='text'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>

      <label>
        Position:
        <input
          id='position'
          name='position'
          type='text'
          value={position}
          onChange={({ target }) => setPosition(target.value)}
        />
      </label>

      <button type='submit' aria-label='Add a player'>
        Add
      </button>
    </form>
  )
}
