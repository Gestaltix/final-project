export const sessions = (state = {
    team: null,
    selectedSession: null,
    sessions: []
}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case 'setSessionTeam':
            newState.team = action.data
            return newState
        case 'setSession':
            newState.selectedSession = action.data
            return newState
        case 'setSessions':
            newState.sessions = action.data
            return newState
        default:
            return state
    }
}