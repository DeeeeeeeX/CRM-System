import { ActiveTabs, MetaResponse, Todo, TodoInfo } from '../types/types';
import axios from 'axios';

const baseInstance = axios.create({
  baseURL: 'https://easydev.club/api/v1/todos',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getToDo(activeTab?: ActiveTabs): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await baseInstance.get('', {
    params: {
      filter: activeTab,
    },
  });
  return response.data;
}

export async function deleteToDo(id: number): Promise<void> {
  await baseInstance.delete(`/${id}`);
}

export async function editToDo(
  id: number,
  taskState: Partial<Pick<Todo, 'title' | 'isDone'>>,
): Promise<void> {
  await baseInstance.put(`/${id}`, taskState);
}

export async function createToDo(title: string): Promise<void> {
  await baseInstance.post('', { isDone: false, title });
}
