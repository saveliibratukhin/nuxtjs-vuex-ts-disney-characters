export interface ICharacter {
    id: number,
    name: string,
    refers: string,
    imageUrl: string,
}

export interface ICharacterFull {
    _id: number,
    films: string[],
    shortFilms: string[],
    tvShows: string[],
    videoGames: string[],
    parkAttractions: string[],
    allies: string[],
    enemies: string[],
    name: string,
    imageUrl: string,
}

export interface ICharactersState {
    characters: ICharacterFull[],
    filteredCharacters: ICharacter[],
    searchString: string,
    loading: boolean,
    page: number,
    charactersPerPage: number,
    totalPages: number
}

export interface IUserActionsState {
    userActions: string[]
}