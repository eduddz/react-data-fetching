import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom"
import { Repository } from "./Repos";

export const Repo = () => {
    const params = useParams();

    // repositorio que está sendo acessado
    const currentRepository = params['*'] as string;

    const queryClient = useQueryClient()

    async function handleChangeRepositoryDescription() {
        // chamada API para atualizar a descrição do repositorio
        const previousRepos = queryClient.getQueryData<Repository[]>('repos')

        if (previousRepos) {
            const nextRepos = previousRepos.map(repo => {
                if(repo.full_name === currentRepository) {
                    // retorna o repo, mas antes altera o valor da descrição
                    return { ...repo, description: 'Testando' }
                } else { return repo }
            })

            queryClient.setQueryData('repos', nextRepos)
        }
        console.log('teste')
    }

    return (
        <>
            <h1>{currentRepository}</h1>
            <button onClick={handleChangeRepositoryDescription}>Alterar Descrição</button>
        </>
    )
}