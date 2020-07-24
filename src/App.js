import React, { Fragment, useState, useEffect } from 'react'
import api from './services/api'

import './styles.css'

function App (){
  const [
    repositories,
    setRepositories,
  ] = useState([])

  useEffect(
    () => {
      api.get('repositories').then((response) => {
        // console.log(response)
        setRepositories(response.data)
      })
    },
    [
      ,
    ],
  )

  async function handleAddRepository (){
    const response = await api.post('repositories', {
      title : `Novo Projeto ${Date.now()}`,
    })

    const repository = response.data

    setRepositories([
      ...repositories,
      repository,
    ])
  }

  async function handleRemoveRepository (id){
    const response = await api.delete(`repositories/${id}`)
    console.log('response:', response)

    // const project = response.status == 204

    if (response.status == 204) {
      setRepositories(repositories.splice(id, 1))
    }
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories &&
          repositories.map((repository, index) => (
            <li key={repository.id}>
              {repository.title}
              <button
                onClick={() =>
                  handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>
        Adicionar
      </button>
    </div>
  )
}

export default App
