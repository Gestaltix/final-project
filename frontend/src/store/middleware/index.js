const customMiddleWare = store => dispatch => action => {
    console.log('Action: ', action);
    if (!action.method) {
        return dispatch(action)
    }

    const headers = new Headers({
        // Authorization: localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : null,
        'content-type': 'multipart/form-data'
    })
    const options = {
        headers: headers,
        body: action.body,
        method: action.method,
    }
    fetch(`http://localhost:8000/backend/${action.endpoint}/`, options)
        .then(res => res.status === 401 ? null : res.json())
        .then(data => {
            console.log(data)
            if (data === null) {
                return null
            }
            dispatch({
                type: action.type,
                data: data
            })
        })
}

export default customMiddleWare;