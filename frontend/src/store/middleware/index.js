const customMiddleWare = store => dispatch => action => {
    console.log('Action: ', action);
    if (!action.method) {
        return dispatch(action)
    }

    const headers = new Headers({
        Authorization: localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : null,
        'content-type': 'application/json'
    })
    const options = {
        headers: headers,
        body: JSON.stringify(action.body),
        method: action.method,
    }
    fetch(`http://localhost:8000/backend/${action.endpoint}/`, options)
        .then(res => res.status !== 200 ? null : res.json())
        .then(data => {
            console.log(data)
            if (data === null) {
                dispatch({
                    type: 'authFalse'
                })
            }
            else dispatch({
                type: action.type,
                data: data
            })
        })
}

export default customMiddleWare;