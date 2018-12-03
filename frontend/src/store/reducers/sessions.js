export const sessions = (state = {
    sessions: [],
    sessionFiles: []
}, action) => {
    const newState = { ...state }
    switch (action.type) {
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