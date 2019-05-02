import CellValueEnum from "../components/cell-value/CellValueEnum"

export const gameStatus = {
    UNFINISHED: 'UNFINISHED',
}

// just showing that I know how to write higher-order functions
const checkEquality = (a, b, c) => (winner) => a === winner && b === winner && c === winner

export const calculateWinner = (array) => {

    // checking rows - 3 options
    
    let firstRowCheck = checkEquality(array[0][0], array[1][0], array[2][0])
    if (firstRowCheck(CellValueEnum.ONE) || firstRowCheck(CellValueEnum.TWO)) return array[0][0]
    
    let secondRowCheck = checkEquality(array[0][1], array[1][1], array[2][1])
    if (secondRowCheck(CellValueEnum.ONE) || secondRowCheck(CellValueEnum.TWO)) return array[0][1]

    let thirdRowCheck = checkEquality(array[0][2], array[1][2], array[2][2])
    if (thirdRowCheck(CellValueEnum.ONE) || thirdRowCheck(CellValueEnum.TWO)) return array[0][2]

    // checking columns - 3 options

    let firstColumnCheck = checkEquality(array[0][0], array[0][1], array[0][2])
    if (firstColumnCheck(CellValueEnum.ONE) || firstColumnCheck(CellValueEnum.TWO)) return array[0][0]

    let secondColumnCheck = checkEquality(array[1][0], array[1][1], array[1][2])
    if (secondColumnCheck(CellValueEnum.ONE) || secondColumnCheck(CellValueEnum.TWO)) return array[1][0]

    let thirdColumnCheck = checkEquality(array[2][0], array[2][1], array[2][2])
    if (thirdColumnCheck(CellValueEnum.ONE) || thirdColumnCheck(CellValueEnum.TWO)) return array[2][0]

    //checking diagonals - 2 options

    let rightToLeftDiagonalCheck = checkEquality(array[0][0], array[1][1], array[2][2])
    if (rightToLeftDiagonalCheck(CellValueEnum.ONE) || rightToLeftDiagonalCheck(CellValueEnum.TWO)) return array[0][0]

    let leftToRightDiagonalCheck = checkEquality(array[0][2], array[1][1], array[2][0])
    if (leftToRightDiagonalCheck(CellValueEnum.ONE) || leftToRightDiagonalCheck(CellValueEnum.TWO)) return array[0][2]


    else return gameStatus.UNFINISHED
  }

// if we have no empty spots, it's a tie
export const emptySpotExists = (array) => {
    let exists = false
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (array[i][j] === null) exists = true
        }
    }
    return exists
}

