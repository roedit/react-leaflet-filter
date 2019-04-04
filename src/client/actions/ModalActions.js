export const showModal = (payload) => {
    return {
        type: 'SHOW_MODAL',
        payload: payload
    }
}

export const closeModal = () => {
    return {
        type: 'CLOSE_MODAL'
    }
}