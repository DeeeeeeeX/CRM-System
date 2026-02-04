import { ActiveTabs, MetaResponse, Todo, TodoInfo } from '../types/types';
import axios from 'axios';

const baseFetch = axios.create({
  baseURL: 'https://easydev.club/api/v1/todos',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getToDos(activeTab?: ActiveTabs): Promise<MetaResponse<Todo, TodoInfo>> {
  let filter;
  if (activeTab === 'all') {
    filter = '';
  } else if (activeTab === 'inWork') {
    filter = 'inWork';
  } else if (activeTab === 'complete') {
    filter = 'completed';
  }
  try {
    let response = await baseFetch.get('', {
      params: {
        filter: filter,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
    throw error;
  }
}

export async function deleteToDo(id: number): Promise<void> {
  try {
    await baseFetch.delete(`/${id}`);
  } catch (error) {
    console.log('Ошибка', error);
    console.log(error);
  }
}

export async function putToDo(
  id: number,
  taskState: {
    title?: string;
    isDone?: boolean;
  },
): Promise<void> {
  try {
    await baseFetch.put(`/${id}`, taskState);
  } catch (error) {
    console.log('Ошибка', error);
    throw error;
  }
}

export async function postToDo(title: string): Promise<void> {
  try {
    await baseFetch.post('', { isDone: false, title: title });
  } catch (error) {
    console.log('Ошибка', error);
    throw error;
  }
}
