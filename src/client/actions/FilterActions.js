export const initCoordinates = (payload) => {
  return {
      type: 'INIT_COORDINATES',
      payload: payload
  }
}

export const coordinatesUpdated = (payload) => {
  return {
      type: 'COORDINATES_UPDATED',
      payload: payload
  }
}
