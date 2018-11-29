export const teams = (state = [], action) => {
    switch (action.type) {
        case 'setTeam':
            return action.data
        default:
            return state
    }
}