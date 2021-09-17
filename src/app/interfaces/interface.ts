import { LevelTypes } from '../enums/enum';

export interface Cell {
  notes: number[];
  value: number;
  changeable: boolean;
  highlight: boolean;
  selected: boolean;
  error?: boolean;
  selectedValue?: boolean;
}
export interface CellIndex {
  rowIndex: number;
  columnIndex: number;
}

export interface CellHistory {
  index: CellIndex;
  cell: Cell;
}

export interface modalData {
  time: number;
  bestTime: number;
  level: LevelTypes;
}

export interface TimeRecord {
  easy: number | null;
  difficult: number | null;
}

export interface starCount {
  one: boolean;
  two: boolean;
  three: boolean;
}
