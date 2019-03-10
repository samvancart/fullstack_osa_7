
const notification = ''

const initialState = notification

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SHOW_NOTIFICATION':
        return action.content
    case 'HIDE_NOTIFICATION':
        return action.content
    default:
        return state
    }
}

export const showNotification = (content, timeout) => {
    timeout *= 1000
    return async dispatch => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            content
        })
        setTimeout(() => {
            dispatch(hideNotification(''))
        }, timeout)
    }
}

const hideNotification = (content) => {
    return {
        type: 'HIDE_NOTIFICATION',
        content
    }
}



export default notificationReducer