import { useCallback, useMemo } from 'react'
import { useQuery } from 'react-query'
import { fetchCharacter } from './api'
import { Character } from '../../models'

const CHARACTER_QUERY_KEY = 'character'

interface CharacterController {
    isLoading: boolean,
    character?: Character,
}

export const useCharacter = (characterID: number) => {
    const fetchCharacterByID = useCallback(async () => {
        return fetchCharacter(characterID)
    }, [characterID])

    const {
        isLoading,
        data,
    } = useQuery(
        [CHARACTER_QUERY_KEY],
        fetchCharacterByID,
    )

    const controller = useMemo<CharacterController>(() => ({
        isLoading,
        character: data,
    }),[ 
        isLoading,
        data,
    ])

    return controller
}

