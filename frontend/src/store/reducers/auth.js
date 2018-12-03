export const auth = (state = {
    isAuthenticated: true
}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case 'Auth':
            console.log('checking Authorization...')
            if (action.data.code === 'token_not_valid') {
                newState.isAuthenticated = false
            } else { newState.isAuthenticated = true }
            return newState
        default:
            return state
    }
}