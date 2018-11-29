export const auth = (state = {
    isAuthenticated: false
}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case 'AuthTrue':
            newState.isAuthenticated = true
            return newState
        default:
            return state
    }
}