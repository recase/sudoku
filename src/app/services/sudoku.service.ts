import { Injectable } from '@angular/core';
import { Cell, CellIndex } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class SudokuService {
  constructor() {}

  public generateSudoku(emptyCell: number): {
    validSudoku: Cell[][];
    solvedSudoku: Cell[][];
  } {
    const initialSudoku = this.generateInitialSudoku();
    const { sudoku, solveable } = this.generateCompleteSudoku(initialSudoku);
    const solvedSudoku = JSON.parse(JSON.stringify(sudoku));

    const validSudoku = this.retrieveUniquePuzzle(sudoku, emptyCell);
    return { validSudoku, solvedSudoku };
  }

  // get unique solution puzzle
  private retrieveUniquePuzzle(sudoku: Cell[][], emptyCell: number): Cell[][] {
    const validRemoveIndices: CellIndex[] = [];
    const invalidRemoveIndices: CellIndex[] = [];
    while (validRemoveIndices.length < emptyCell) {
      const index: CellIndex = this.generateRandomCell(
        validRemoveIndices,
        invalidRemoveIndices
      );
      const temp_sudoku = JSON.parse(JSON.stringify(sudoku));
      const result = this.checkPuzzleUniqueness(temp_sudoku, index);

      if (result) {
        validRemoveIndices.push(index);
        sudoku[index.rowIndex][index.columnIndex] = {
          value: 0,
          changeable: true,
          notes: [],
          highlight: false,
          selected: false,
        };
      } else {
        invalidRemoveIndices.push(index);
      }
    }
    return sudoku;
  }

  // checks the uniqueness of the puzzle
  private checkPuzzleUniqueness(
    temp_sudoku: Cell[][],
    index: CellIndex
  ): boolean {
    let hasUniqueSolution = true;
    const initialValue = temp_sudoku[index.rowIndex][index.columnIndex].value;
    temp_sudoku[index.rowIndex][index.columnIndex].changeable = true;
    let startValue = 1;
    do {
      temp_sudoku[index.rowIndex][index.columnIndex].value = startValue;
      const { sudoku, solveable } = this.generateCompleteSudoku(
        temp_sudoku,
        true
      );
      if (solveable && startValue != initialValue) {
        hasUniqueSolution = false;
        break;
      }
      startValue++;
    } while (startValue < 9);

    return hasUniqueSolution;
  }

  // to fill the random column with numbers
  private generateInitialSudoku(): Cell[][] {
    const initial: Cell[][] = [];
    const randomColumnIndex = this.generateRandomNumber();
    const assignedNumber: number[] = [];
    for (let i = 0; i < 9; i++) {
      initial[i] = [];
      for (let j = 0; j < 9; j++) {
        let value = 0;
        if (j == randomColumnIndex - 1) {
          value = this.generateRandomNumber(assignedNumber);
          assignedNumber.push(value);
        }
        initial[i][j] = {
          value,
          notes: [],
          changeable: false,
          highlight: false,
          selected: false,
        };
      }
    }
    return initial;
  }

  // generate complete sudoku from the initial sudoku
  private generateCompleteSudoku(
    sudoku: Cell[][],
    solveFlag: boolean = false
  ): { sudoku: Cell[][]; solveable: boolean } {
    let solveable = true;
    outer_loop: for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const result = this.generateUniqueToCell(sudoku, i, j, solveFlag);
        if (!result.result) {
          solveable = false;
          break outer_loop;
        }
        i = result.row;
        j = result.column;

        sudoku[i][j].value = result.result;
      }
    }
    return { sudoku, solveable };
  }

  // solve sudoku usign the backtracking algorithm
  private generateUniqueToCell(
    sudoku: Cell[][],
    row: number,
    column: number,
    solveFlag: boolean = false
  ): { result: number; row: number; column: number } {
    let solveable = true;
    const uniquIndex = this.retriveUniqueIndices(row, column);
    const assignedValues = uniquIndex.map((item) => {
      if (
        !(row === item.rowIndex && column === item.columnIndex) &&
        sudoku[item.rowIndex][item.columnIndex]?.value
      ) {
        return sudoku[item.rowIndex][item.columnIndex].value;
      }
      return;
    });
    const value = sudoku[row][column].value || 1;
    const result = this.checkUnique(value, assignedValues);
    if (result == -1) {
      sudoku[row][column].value = 0;
      loop: do {
        if (row === 0 && column === 0) {
          solveable = false;
          break loop;
        }
        if (column == 0) {
          row -= 1;
          column = 8;
        } else {
          column -= 1;
        }
        if (!solveFlag || sudoku[row][column].changeable) {
          sudoku[row][column].value += 1;
        }
      } while (solveFlag && !sudoku[row][column].changeable);
      if (!solveable) {
        return { result: 0, row, column };
      }
      return this.generateUniqueToCell(sudoku, row, column);
    } else {
      return { result, row, column };
    }
  }

  // retrieve the indices to have unique values
  public retriveUniqueIndices(
    rowIndex: number,
    columnIndex: number
  ): CellIndex[] {
    const indices: CellIndex[] = [];
    const cell = [Math.floor(rowIndex / 3), Math.floor(columnIndex / 3)];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (i == rowIndex) {
          indices.push({ rowIndex, columnIndex: j });
        } else if (j == columnIndex) {
          indices.push({ rowIndex: i, columnIndex });
        } else if (
          Math.floor(i / 3) === cell[0] &&
          Math.floor(j / 3) === cell[1]
        ) {
          indices.push({ rowIndex: i, columnIndex: j });
        }
      }
    }
    return indices;
  }

  private checkUnique(
    value: number,
    assignedValues: (number | null | undefined)[]
  ): number {
    if (value == 10) {
      return -1;
    }
    if (assignedValues.includes(value)) {
      return this.checkUnique(value + 1, assignedValues);
    } else {
      return value;
    }
  }

  // to generate random nnumber from 0-9
  private generateRandomNumber(assignedList: number[] = []): number {
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    if (assignedList.includes(randomNumber)) {
      return this.generateRandomNumber(assignedList);
    } else {
      return randomNumber;
    }
  }

  private generateRandomCell(
    validIndices: CellIndex[],
    invalidIndices: CellIndex[]
  ): CellIndex {
    let cellIndex: CellIndex;
    const rowIndex = this.generateRandomNumber() - 1;
    const columnIndex = this.generateRandomNumber() - 1;
    cellIndex = { rowIndex, columnIndex };
    if (
      validIndices.some(
        (b) =>
          b.rowIndex == cellIndex.rowIndex &&
          b.columnIndex == cellIndex.columnIndex
      ) ||
      invalidIndices.some(
        (b) =>
          b.rowIndex == cellIndex.rowIndex &&
          b.columnIndex == cellIndex.columnIndex
      )
    ) {
      return this.generateRandomCell(validIndices, invalidIndices);
    } else {
      return cellIndex;
    }
  }
}
