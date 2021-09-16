import { Component, OnInit } from '@angular/core';
import { Cell } from '../interfaces/interface';
import { SudokuService } from '../services/sudoku.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  // public sudoku = [
  //   [1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   [1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   [1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   [1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   [1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   [1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   [1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   [1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   [9, 8, 7, 6, 5, 4, 3, 2, 1],
  // ];
  public sudoku: Cell[][];

  public num_buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(private sudokuService: SudokuService) {
    this.sudoku = this.sudokuService.generateSudoku();
  }

  ngOnInit(): void {
    console.log(this.sudoku);
  }
}
