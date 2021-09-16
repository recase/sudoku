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
