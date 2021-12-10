import React from 'react'

import './TeamForm.css'

export default function TeamForm({
  name,
  city,
  state,
  handleSubmit,
  setName,
  setCity,
  setState,
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
        City:
        <input
          id='city'
          name='city'
          type='text'
          value={city}
          onChange={({ target }) => setCity(target.value)}
        />
      </label>
      
      <label>
        State:
        <input
          id='state'
          name='state'
          type='text'
          value={state}
          onChange={({ target }) => setState(target.value)}
        />
      </label>

      <button type='submit' aria-label='Add a team'>
        Add
      </button>
    </form>
  )
}
