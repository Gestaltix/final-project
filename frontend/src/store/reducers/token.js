export const token = (state = {}, action) => {
    switch (action.type) {
        case 'setToken':
            localStorage.setItem('token', action.data.access)

            return action.data.access
        default:
            return state
    }
}