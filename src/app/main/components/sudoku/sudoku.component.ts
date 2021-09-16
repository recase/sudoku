import { Component, Input, OnInit } from '@angular/core';
import { Cell } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.scss'],
})
export class SudokuComponent implements OnInit {
  @Input() sudoku!: Cell[][];

  constructor() {}

  ngOnInit(): void {}
}
