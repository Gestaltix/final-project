export const sessions = (state = {
    team: null,
    selectedSession: [],
    sessions: [],
    sessionFiles: []
}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case 'setSessionTeam':

        case 'setSession':
            newState.selectedSession = action.data[0]
            return newState
        case 'setFiles':
            newState.sessionFiles = action.data
            return newState
        case 'setSessions':
            newState.sessions = action.data
            return newState
        default:
            return state
    }
}