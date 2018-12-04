export const player = (state = {}, action) => {
    switch (action.type) {
        case 'setPlayer':
            return action.data
        default:
            return state
    }
}