import { Injectable } from '@angular/core';
import { Cell, CellIndex } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class SudokuService {
  constructor() {}

  public generateSudoku(): Cell[][] {
    let sudoku = this.generateInitialSudoku();
    return this.generateCompleteSudoku(sudoku);
  }

  // to fill the random column with numbers
  private generateInitialSudoku(): Cell[][] {
    let initial: Cell[][] = [];
    const randomColumnIndex = this.generateRandomNumber();
    const assignedNumber: number[] = [];
    for (let i = 0; i < 9; i++) {
      initial[i] = [];
      for (let j = 0; j < 9; j++) {
        let value = null;
        if (j == randomColumnIndex - 1) {
          value = this.generateRandomNumber(assignedNumber);
          assignedNumber.push(value);
        }
        initial[i][j] = {
          value,
          notes: [],
        };
      }
    }
    return initial;
  }

  // generate complete sudoku from the initial sudoku
  private generateCompleteSudoku(sudoku: Cell[][]) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const result = this.generateUniqueToCell(sudoku, i, j);
        const value = result.result;
        i = result.row;
        j = result.column;

        sudoku[i][j].value = value;
      }
    }
    return sudoku;
  }

  // solve sudoku usign the backtracking algorithm
  private generateUniqueToCell(
    sudoku: Cell[][],
    row: number,
    column: number
  ): { result: number; row: number; column: number } {
    const uniquIndex = this.retriveUniqueIndices(row, column);
    const assignedValues = uniquIndex.map((item) => {
      if (sudoku[item.rowIndex][item.columnIndex]?.value) {
        return sudoku[item.rowIndex][item.columnIndex].value;
      }
      return;
    });
    let value = sudoku[row][column].value || 1;
    const result = this.checkUnique(value, assignedValues);
    if (result == -1) {
      sudoku[row][column].value = null;
      if (column == 0) {
        row -= 1;
        column = 8;
      } else {
        column -= 1;
      }
      return this.generateUniqueToCell(sudoku, row, column);
    } else {
      return { result, row, column };
    }
  }

  // retrieve the indices to have unique values
  private retriveUniqueIndices(
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
}
