export const rotate = (arr, pos) => {
    if (pos < 0) {
        return false
    }
    pos = pos % arr.length
    return arr.slice(pos).concat(arr.slice(0, pos))
}
