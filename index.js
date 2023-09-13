import { rotate } from './answer.js'

const errorMessages = {
    arrLen: 'Please enter a number between 1 and 20.',
    numRot: 'Please enter a non-negative number for rotations.',
    submitRequirements: 'Array length must be a number between 1 and 20, and the number of rotations must be a number greater than 0'
}

const inputNumRotEle = document.getElementById('num-rotations')
const notifEle = document.getElementById('notification')
const inputLenEle = document.getElementById('arr-len')
const rotateBtn = document.getElementById('rotate-button')
const resultEle = document.getElementById('rotation-result')
const clearBtn = document.getElementById('clear-results-button')
let numRotations
let demoArr

const create1IdxArr = (len = 7) => (
    Array.from({length: len}, (v, k) => k+1)
)

demoArr = create1IdxArr()

const createArrForDisplay = (arr, parentEle) => {
    arr.forEach(num => {
        const liEle = document.createElement('div')
        liEle.classList.add('num-arr-item')
        liEle.append(num)
        parentEle.append(liEle)
    })
}

const createDemoEle = (arr) => {
    const numArrDemoEle = document.getElementById('number-array-demo')
    numArrDemoEle.innerHTML = ""
    createArrForDisplay(arr, numArrDemoEle)
}

inputLenEle.addEventListener(
    "focusout", (e) => {
        const arrLen = e.target.value
        if (!inputLenEle.validity.valid) {
            notifEle.classList.remove('hidden')
            notifEle.innerHTML = errorMessages.arrLen
        } else if (arrLen && inputLenEle.validity.valid) {
            notifEle.classList.add('hidden')
            demoArr = create1IdxArr(arrLen)
            createDemoEle(demoArr)
        }
    }
)

inputNumRotEle.addEventListener(
    "focusout", (e) => {
        const numRot = e.target.value
        if (!inputNumRotEle.validity.valid) {
            notifEle.classList.remove('hidden')
            notifEle.innerHTML = errorMessages.numRot
            numRotations = undefined
        } else if (numRot && inputNumRotEle.validity.valid) {
            notifEle.classList.add('hidden')
            numRotations = numRot
        }
    }
)

rotateBtn.addEventListener(
    "click", (e) => {
        if (inputNumRotEle.validity.valid && inputLenEle.validity.valid) {
            let rotationResult
            notifEle.classList.add('hidden')
            resultEle.classList.remove('hidden')

            const resultArrEle = document.createElement('div')
            resultArrEle.classList.add('number-array')
            try {
                rotationResult = rotate(demoArr, numRotations)
            } catch (e) {
                notifEle.innerHTML = e
                notifEle.classList.remove('hidden')
                return
            }

            const resultTitle = document.createElement('h3')
            resultTitle.innerHTML = `Your array has been rotated ${numRotations} times to the left!`
            resultEle.append(resultTitle)

            createArrForDisplay(rotationResult, resultArrEle)
            resultEle.append(resultArrEle)
            clearBtn.classList.remove('hidden')
        } else {
            notifEle.classList.remove('hidden')
            notifEle.innerHTML = errorMessages.submitRequirements
        }
    }
)

clearBtn.addEventListener(
    "click", (e) => {
        resultEle.innerHTML = ''
        resultEle.classList.add('hidden')
        clearBtn.classList.add('hidden')
    }
)

createDemoEle(demoArr)
