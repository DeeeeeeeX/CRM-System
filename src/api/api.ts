import {ActiveTabs, MetaResponse, Todo, TodoInfo} from '../types/types';
import axios from 'axios';

const baseFetch = axios.create({
  baseURL: 'https://easydev.club/api/v1/todos',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getToDos(activeTab?: ActiveTabs): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    let response = await baseFetch.get('', {
      params: {
        filter: activeTab,
      },
    });
    console.log(response.data)
    return response.data;

  } catch (error) {
    throw error;
  }
}

export async function deleteToDo(id: number): Promise<void> {
  try {
    await baseFetch.delete(`/${id}`);
  } catch (error) {
    throw error
  }
}

export async function editToDo(id: number, taskState: Partial<Pick<Todo, 'title' | 'isDone'>>): Promise<void> {
  try {
    await baseFetch.put(`/${id}`, taskState);
  } catch (error) {
    throw error;
  }
}

export async function createToDo(title: string): Promise<void> {
  try {
    await baseFetch.post('', {isDone: false, title});
  } catch (error) {
    throw error;
  }
}
