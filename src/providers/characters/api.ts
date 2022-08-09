import { Character } from 'src/models'
import { API_ENDPOINT } from '../constants'

interface CharactersResponse {
    count: number,
    next: string | null,
    previous: string | null,
    results: Character[]
}

export const fetchCharacters = async (page: number = 1): Promise<CharactersResponse> => {
    const res = await fetch(`${API_ENDPOINT}/people?page=${page}`)
    return await res.json()
}

