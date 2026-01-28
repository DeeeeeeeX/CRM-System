import { MetaResponse, Todo, TodoInfo } from '../types/types';
import axios from 'axios';

export const baseUrl = 'https://easydev.club/api/v1/todos';
export const urlGetCompletedTask = 'https://easydev.club/api/v1/todos?filter=completed';
export const urlGetInWorkTask = 'https://easydev.club/api/v1/todos?filter=inWork';

export async function getToDos(url: string): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
    throw error;
  }
}

export async function deleteToDo(id: number): Promise<void> {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    console.log('Ошибка', error);
    throw error;
  }
}

export async function putToDo(
  id: number,
  titleValue: string | boolean | null,
  isDoneValue?: boolean,
): Promise<void> {
  if (typeof titleValue === 'boolean') {
    isDoneValue = titleValue;
    titleValue = null;
  }
  try {
    await axios.put(`${baseUrl}/${id}`, { title: titleValue, isDone: isDoneValue });
  } catch (error) {
    console.log('Ошибка', error);
    throw error;
  }
}

export async function postToDo(text: string): Promise<void> {
  try {
    await axios.post(baseUrl, { isDone: false, title: text });
  } catch (error) {
    console.log('Ошибка', error);
    throw error;
  }
}
