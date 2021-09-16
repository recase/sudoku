import { Component, Input, OnInit } from '@angular/core';
import { Cell, CellHistory, CellIndex } from 'src/app/interfaces/interface';
import { SudokuService } from 'src/app/services/sudoku.service';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.scss'],
})
export class SudokuComponent implements OnInit {
  @Input() public noteFlag: boolean = false;
  public sudoku: Cell[][];
  private solvedSudoku: Cell[][];
  public cellSelectedFlag: boolean = false;
  public gameInProgress: boolean = false;
  public gameCompletedFlag: boolean = false;
  public errorFlag: boolean = false;
  private selectedcell: CellIndex = { rowIndex: -1, columnIndex: -1 };
  private history: CellHistory[] = [];
  private errorTimeOut!: any;

  constructor(private sudokuService: SudokuService) {
    const { validSudoku, solvedSudoku } = this.sudokuService.generateSudoku(36);
    this.sudoku = validSudoku;
    this.solvedSudoku = solvedSudoku;
  }

  ngOnInit(): void {}

  public cellSelected(rowIndex: number, columnIndex: number): void {
    this.resetSelected();
    this.setSelectedCell(rowIndex, columnIndex);
  }

  private resetSelected(): void {
    this.cellSelectedFlag = false;
    this.sudoku.forEach((column) => {
      column.forEach((cell) => {
        if (cell.selected || cell.highlight || cell.selectedValue) {
          cell.selected = false;
          cell.highlight = false;
          cell.selectedValue = false;
        }
      });
    });
  }

  private setSelectedCell(rowIndex: number, columnIndex: number): void {
    const uniqueIndex: CellIndex[] = this.sudokuService.retriveUniqueIndices(
      rowIndex,
      columnIndex
    );
    this.cellSelectedFlag = true;
    this.selectedcell = { rowIndex, columnIndex };
    this.sudoku[rowIndex][columnIndex].selected = true;
    const selectedValue = this.sudoku[rowIndex][columnIndex].value;
    this.sudoku.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (
          uniqueIndex.some(
            (item) =>
              item.rowIndex === rowIndex && item.columnIndex === columnIndex
          )
        ) {
          cell.highlight = true;
        }
        if (selectedValue && cell.value === selectedValue) {
          cell.selectedValue = true;
        }
      });
    });
  }

  public inputEvent(num: number): void {
    const selectedcell: Cell =
      this.sudoku[this.selectedcell.rowIndex][this.selectedcell.columnIndex];
    if (selectedcell.changeable) {
      if (this.noteFlag) {
        selectedcell.notes = this.toggleNoteValue(selectedcell.notes, num);
      } else {
        const cell: Cell = JSON.parse(JSON.stringify(selectedcell));
        cell.selected = false;
        this.history.push({ index: this.selectedcell, cell });
        selectedcell.value = num;
        selectedcell.notes = [];
        this.highlightSelectedValues(selectedcell);
        this.checkAnswer();
        this.updateGameCompleteStatus();
      }
    }
  }

  private highlightSelectedValues(selectedcell: Cell): void {
    this.sudoku.forEach((row) => {
      row.forEach((cell) => {
        cell.selectedValue = false;
        if (selectedcell.value && cell.value === selectedcell.value) {
          cell.selectedValue = true;
        }
      });
    });
  }

  private updateGameCompleteStatus(): void {
    this.gameCompletedFlag = this.sudoku.every((row) =>
      row.every((cell) => cell.value && !cell.error)
    );
  }

  private toggleNoteValue(notes: number[], num: number): number[] {
    if (notes.includes(num)) {
      notes = notes.filter((item) => item !== num);
    } else {
      notes.push(num);
      notes.sort();
    }
    return notes;
  }

  private checkAnswer(): void {
    if (
      this.sudoku[this.selectedcell.rowIndex][this.selectedcell.columnIndex]
        .value ===
      this.solvedSudoku[this.selectedcell.rowIndex][
        this.selectedcell.columnIndex
      ].value
    ) {
      this.sudoku[this.selectedcell.rowIndex][
        this.selectedcell.columnIndex
      ].error = false;
    } else {
      this.sudoku[this.selectedcell.rowIndex][
        this.selectedcell.columnIndex
      ].error = true;
      this.setErrorClass();
    }
  }

  private setErrorClass() {
    if (this.errorTimeOut) {
      this.errorFlag = false;
    }
    this.errorFlag = true;
    this.errorTimeOut = setTimeout(() => {
      this.errorFlag = false;
    }, 500);
  }

  public undoEvent(): void {
    const historyItem: CellHistory | undefined = this.history.pop();
    if (historyItem) {
      this.sudoku[historyItem.index.rowIndex][historyItem.index.columnIndex] =
        historyItem.cell;
      this.cellSelected(
        historyItem.index.rowIndex,
        historyItem.index.columnIndex
      );
    }
  }

  public eraseEvent(): void {
    const cell: Cell =
      this.sudoku[this.selectedcell.rowIndex][this.selectedcell.columnIndex];
    if (cell.changeable) {
      this.history.push({
        index: this.selectedcell,
        cell: JSON.parse(JSON.stringify(cell)),
      });
      cell.value = 0;
      cell.error = false;
    }
  }

  // public continueGameEvent(flag: boolean): void {
  //   this.gameInProgress = flag;
  //   if (!this.sudoku.length) {
  //     this.createNewSudoku();
  //   }
  // }
}
