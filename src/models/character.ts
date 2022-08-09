export interface Character {
    id: number
    birth_year: string 
    eye_color: string 
    gender: string 
    hair_color: string
    height: string 
    mass: string 
    name: string 
    skin_color: string 
    url: string,
    imgUrl: string,
}

export const isCharacter = (character: any): character is Character => {
    return (
        character !== null && 
        typeof character === 'object' &&
        (character as Character).birth_year !== undefined &&
        (character as Character).eye_color !== undefined &&
        (character as Character).hair_color !== undefined &&
        (character as Character).gender !== undefined &&
        (character as Character).height !== undefined &&
        (character as Character).mass !== undefined &&
        (character as Character).name !== undefined &&
        (character as Character).skin_color !== undefined &&
        (character as Character).url !== undefined &&
        (character as Character).imgUrl !== undefined
    )
}

