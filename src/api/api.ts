import { MetaResponse, Todo, TodoInfo } from '../types/types';

export const baseUrl = 'https://easydev.club/api/v1/todos';

export async function getToDos(url: string): Promise<MetaResponse<Todo, TodoInfo>> {
  let data;
  try {
    let response = await fetch(url, { method: 'GET' });
    data = await response.json();
  } catch (error) {
    console.log('Ошибка', error);
    throw error;
  }
  return data;
}

export async function deleteToDo(id: number): Promise<void> {
  try {
    await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
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
    await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: titleValue, isDone: isDoneValue }),
    });
  } catch (error) {
    console.log('Ошибка', error);
    throw error;
  }
}

export async function postToDo(text: string): Promise<void> {
  try {
    await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isDone: false, title: text }),
    });
  } catch (error) {
    console.log('Ошибка', error);
    throw error;
  }
}
