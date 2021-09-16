import { Component, OnInit, ViewChild } from '@angular/core';
import { SudokuComponent } from './components/sudoku/sudoku.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild(SudokuComponent) sudokuComponent!: SudokuComponent;
  public num_buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  public noteFlag: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public inputEvent(num: number) {
    this.sudokuComponent.inputEvent(num);
  }
  public toggleNote(): void {
    this.noteFlag = !this.noteFlag;
  }
  public undoEvent() {
    this.sudokuComponent.undoEvent();
  }
  public eraseEvent() {
    this.sudokuComponent.eraseEvent();
  }
}
