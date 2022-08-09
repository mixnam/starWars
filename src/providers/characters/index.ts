import { useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { fetchCharacters } from './api'
import { Character } from '../../models'

const CHARACTERS_QUERY_KEY = 'characters'

interface CharactersController {
    isLoading: boolean,
    page: number,
    totalPage: number,
    goToPage: (page: number) => void,
    data?: Character[],
}

export const useCharacters = (): CharactersController => {
    const [page, setPage] = useState(1)

    const fetchCharactersByPage = useCallback(async () => {
        const data = await fetchCharacters(page)

        const imgLoading: Promise<void>[] = []
        const idRegEx = /people\/(?<id>[0-9]*)/

        data.results.forEach(character => {
            const id = idRegEx.exec(character.url)?.groups?.id
            if (id === undefined) {
                return
            }
            character.id = Number.parseInt(id)
            imgLoading.push(new Promise(resolve => {
                const img = new Image()
                img.onload = () => resolve()
                img.src = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
                character.imgUrl = img.src
            }))
        })
        await Promise.all(imgLoading)
        return data
    }, [page])

    const {
        isLoading,
        data,
    } = useQuery(
        [CHARACTERS_QUERY_KEY, page],
        fetchCharactersByPage,
        {
            keepPreviousData: true,
        },
    )

    const goToPage = useCallback((newPage: number) => {
        setPage(newPage)
    }, [])

    const controller = useMemo(() => ({
        isLoading: isLoading,
        page,
        totalPage: data?.count ? Math.ceil(data.count / 10) : 0,
        data: data?.results,
        goToPage,
    }), [
        page,
        data,
        goToPage,
        isLoading,
    ])

    return controller
}
