export type ActiveTabs = 'all' | 'inWork' | 'completed' | null;

export interface Todo {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface MetaResponse<T, N> {
  data: T[];
  info: N;
  meta: {
    totalAmount: number;
  };
}

export type FetchFunc = (tabTask?: ActiveTabs) => Promise<void>;
export type FieldType = {
  taskInput?: string;
  title?: string;
  task?: string;
};
