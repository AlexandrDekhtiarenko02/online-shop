export const getCharacteristics = product => Object.entries(product).filter(item => item[1]?.characteristic === true)
