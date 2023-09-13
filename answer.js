export const rotate = (arr, pos) => {
    if (pos < 0) {
        throw new Error('Rotations cannot be negative')
    }
    pos = pos % arr.length
    return arr.slice(pos).concat(arr.slice(0, pos))
}
