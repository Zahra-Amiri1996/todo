import { ListModel } from './list.model';

export interface TaskModel {
  id?: string;
  title: string;
  description?: string;
  done?: boolean;
  date?: Date;
  list?: ListModel | string;
}
