import { IUserActionsState } from "~/types/CharacterType.interface";

export const state = (): IUserActionsState => ({
    userActions: []
})

export const actions = {
    addAction({state, commit}: any, action: string) {
        commit('setActions', [...state.userActions ,action])
    }
}

export const mutations = {
    setActions(state: IUserActionsState, newActions: string[]) {
        state.userActions = newActions
    },
}