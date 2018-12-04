export const graphs = (state = {
    teamGraph: {}
}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case 'setTeamGraph':
            newState.teamGraph = action.data
            return newState
        default:
            return state
    }
}