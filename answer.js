export const rotate = (arr, pos) => {
    pos = pos % arr.length
    return arr.slice(pos).concat(arr.slice(0, pos))
}
