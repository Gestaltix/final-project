export const trackers = (state = [], action) => {
    switch (action.type) {
        case 'setTrackers':
            return action.data
        default:
            return state
    }
}