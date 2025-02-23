export interface ColumnModel<T> {
  columnDef: string;
  header: string;
  cell: (row: T) => string;
}
