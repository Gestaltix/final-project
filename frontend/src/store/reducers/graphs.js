export const graphs = (state = {
    teamGraph: {},
    playerGraph: []
}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case 'setTeamGraph':
            newState.teamGraph = action.data
            return newState
        case 'setPlayerGraph':
            console.log(action.data)
            newState.playerGraph = action.data
            return newState
        default:
            return state
    }
}