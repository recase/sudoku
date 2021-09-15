import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.scss'],
})
export class SudokuComponent implements OnInit {
  @Input() sudoku!: number[][];

  constructor() {}

  ngOnInit(): void {}
}
