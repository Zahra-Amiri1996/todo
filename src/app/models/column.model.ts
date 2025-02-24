export interface ColumnModel<T> {
  columnDef: string;
  header: string;
  cell: (row: T) => string;
  type: 'string' | 'date' | 'number' | 'template';
}
