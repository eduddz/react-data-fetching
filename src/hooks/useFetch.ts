import axios, { AxiosRequestConfig } from "axios"
import { useEffect, useState } from "react"

const api = axios.create({
    baseURL: 'https://api.github.com/users/'
})

export const useFetch = <T = unknown>(url: string, option?: AxiosRequestConfig) => {
    const [data, setData] = useState<T | null>(null);
    const [isFetching, setIsFetching] = useState(true);
    // Error é global no browser
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        api.get(url, option)
        // .then() só executa se der sucesso
        .then(response => {
            setData(response.data)
        })
        // .catch() só executa se houver erro
        .catch(err => {
            setError(err)
        })
        // quando a chamar da api finalizar, será enviado dando certo ou não
        .finally(() => {
            setIsFetching(false)
        })
    }, [])

    // retornando { data } dentro de um objeto porque será retornado mais coisas de dentro
    return { data, error, isFetching }
}