// import { useEffect, useState } from "react"
import axios from 'axios'
// import { useFetch } from "./hooks/useFetch"

import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export type Repository = {
  full_name: string;
  description: string;
}

export function Repos() {
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
  // const { data: repostiories, isFetching } = useFetch<Repository[]>('eduddz/repos')

  // ---------- com services / queryClient
  // o primeiro parâmetro é como se fosse um id para identificar a requisição
  const { data: repositories, isFetching } = useQuery<Repository[]>('repos', async () => {
    const response = await axios.get('https://api.github.com/users/eduddz/repos')

    return response.data;
  }, {
      // quantidade de tempo que quero manter os dados em cache
      staleTime: 1000 * 60 // 1 minuto
  })

  return (
    <ul>
      { isFetching && <p>Carrregando...</p>}
      {repositories?.map(repo => {
      return (
        <li key={repo.full_name}>
          <Link to={`repos/${repo.full_name}`}>
            {repo.full_name}
          </Link>
          <p>{repo.description}</p>
        </li>
      )
    })}
    </ul>
  )
}