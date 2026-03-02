export enum TaskStatus {
  ALL = 'all',
  IN_WORK = 'inWork',
  COMPLETED = 'completed'
}

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

export type FetchFunc = () => Promise<void>;
export type ValidatorFunc = (value: string) => string;
