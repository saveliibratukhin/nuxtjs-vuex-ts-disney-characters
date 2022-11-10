import { ICharacter, ICharacterFull } from "~/types/CharacterType.interface";
import axios from "axios";
import { ICharactersState } from "~/types/CharacterType.interface";

export const state = (): ICharactersState => ({
    characters: [],
    filteredCharacters: [],
    searchString: '',
    loading: true,
    charactersPerPage: 10,
    page: 1,
    totalPages: 0
})

export const getters = {
    getCharactersByPage(state: ICharactersState) : ICharacter[] {
        return state.filteredCharacters.slice( (state.page - 1) * state.charactersPerPage, state.page * state.charactersPerPage )
    },
    characterAllInfo(state: ICharactersState) {
        return (id: number) => {
            return state.characters.find(c => c._id === id)
        }
    }
}

export const actions = {
    async fetchCharacters({state, commit}: any) {
        axios.get('https://api.disneyapi.dev/characters')
            .then(res => {
                commit('setCharacters', res.data.data)
                commit('setFilteredCharacters', state.characters.map((fc: ICharacterFull) => {
                    let refersStr = [...fc.films, ...fc.shortFilms, ...fc.tvShows, ...fc.videoGames, ...fc.parkAttractions].join(', ')
                    if (refersStr.length > 55)
                        refersStr = refersStr.substring(0, 43) + '...'
                    return {id: fc._id,
                    name: fc.name,
                    refers: refersStr,
                    imageUrl: fc.imageUrl,}
                }))
                commit('setLoading', false)
                commit('setTotalPages', Math.ceil( res.data.data.length / state.charactersPerPage ))
            })
    },
    searchInput({state, commit}: any, searchStr: string) {
        commit('setSearchString', searchStr)
        commit('setPage', 1)
        commit('setFilteredCharacters', state.characters.filter((c: ICharacterFull) => c.name.toLowerCase().includes(state.searchString.toLowerCase())  
                || c.films.filter(f => f.toLowerCase().includes(state.searchString.toLowerCase())).length !== 0
                || c.parkAttractions.filter(p => p.toLowerCase().includes(state.searchString.toLowerCase())).length !== 0
                || c.shortFilms.filter(f => f.toLowerCase().includes(state.searchString)).length !== 0
                || c.tvShows.filter(s => s.toLowerCase().includes(state.searchString.toLowerCase())).length !== 0
                || c.videoGames.filter(g => g.toLowerCase().includes(state.searchString.toLowerCase())).length !== 0
            ).map((fc: ICharacterFull) => {
                let refersStr = [...fc.films, ...fc.shortFilms, ...fc.tvShows, ...fc.videoGames, ...fc.parkAttractions].join(', ')
                if (refersStr.length > 55)
                    refersStr = refersStr.substring(0, 43) + '...'
                return {id: fc._id,
                name: fc.name,
                refers: refersStr,
                imageUrl: fc.imageUrl,}
            }))
        commit('setTotalPages', Math.ceil( state.filteredCharacters.length / state.charactersPerPage))
    },
    changeCharactersPerPage({state,commit}: any, charactersPerPage: number) {
        commit('setCharactersPerPage', charactersPerPage)
        commit('setTotalPages', Math.ceil( state.filteredCharacters.length / charactersPerPage))
        commit('setPage', 1)
    }
}

export const mutations = {
    setSearchString(state: ICharactersState, newStr: string) {
        state.searchString = newStr
    },
    setCharacters(state: ICharactersState, characters: ICharacterFull[]) {
        state.characters = characters
    },
    setLoading(state: ICharactersState, loading: boolean) {
        state.loading = loading
    },
    setTotalPages(state: ICharactersState, totalPages: number) {
        state.totalPages = totalPages
    },
    setPage(state: ICharactersState, page: number) {
        state.page = page
    },
    setFilteredCharacters(state: ICharactersState, characters: ICharacter[]) {
        state.filteredCharacters = characters
    },
    setCharactersPerPage(state: ICharactersState, charactersPerPage: number) {
        state.charactersPerPage = charactersPerPage
    }
}