export const nonFetchData = (state = {
    homeTab: 0,
    teamTab: 0,
    memberTab: 0,
}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case 'changeHomeTab':
            newState.homeTab = action.tab
            return newState
        case 'changeTeamTab':
            newState.teamTab = action.tab
            return newState
        case 'changeMemberTab':
            newState.memberTab = action.tab
            return newState
        default:
            return newState
    }
}