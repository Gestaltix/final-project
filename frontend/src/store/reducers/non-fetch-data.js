export const nonFetchData = (state = {
    tab: 0,
}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case 'changeTab':
            newState.tab = action.tab
            return newState
        default:
            return newState
    }
}