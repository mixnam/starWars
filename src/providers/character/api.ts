import { Character } from 'src/models'
import { API_ENDPOINT } from '../constants'

interface CharacterResponse extends Character {}

export const fetchCharacter = async (characterID: number): Promise<CharacterResponse> => {
    const res = await fetch(`${API_ENDPOINT}/people/${characterID}`)
    return await res.json()
}
