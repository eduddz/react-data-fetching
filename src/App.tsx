// import { useEffect, useState } from "react"
// import axios from 'axios'

import { useFetch } from "./hooks/useFetch"

type Repository = {
  full_name: string;
  description: string;
}

export function App() {
  // const [repositories, setRepositories] = useState<Repository[]>([]);

  // ---------- basico para consumo de api
  // useEffect(() => {
  //   fetch('https://api.github.com/users/eduddz/repos')
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setRepositories(data)
  //   })
  // }, [])

  // ---------- com axios
  // useEffect(() => {
  //   axios.get('https://api.github.com/users/eduddz/repos')
  //   .then(response => {
  //     setRepositories(response.data);
  //   })
  // })

  // ---------- com hooks / useFetch
  const { data: repostiories, isFetching } = useFetch<Repository[]>('eduddz/repos')

  return (
    <ul>
      { isFetching && <p>Carrregando...</p>}
      {repostiories?.map(repo => {
      return (
        <li key={repo.full_name}>
          <strong>{repo.full_name}</strong>
          <p>{repo.description}</p>
        </li>
      )
    })}
    </ul>
  )
}