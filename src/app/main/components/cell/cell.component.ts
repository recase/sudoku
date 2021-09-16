import { Component, Input, OnInit } from '@angular/core';
import { Cell } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit {
  @Input() cell!: Cell;

  constructor() {}

  ngOnInit(): void {}
}
