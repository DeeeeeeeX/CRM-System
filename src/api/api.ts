import { ActiveTabs, MetaResponse, Todo, TodoInfo } from '../types/types';

export const baseUrl = 'https://easydev.club/api/v1/todos';

export async function getToDos(activeTab: ActiveTabs): Promise<MetaResponse<Todo, TodoInfo>> {
  let data;
  let urlFetch;
  if (activeTab === 'all') {
    urlFetch = baseUrl;
  } else if (activeTab === 'inWork') {
    urlFetch = baseUrl + '?filter=inWork';
  } else if (activeTab === 'complete') {
    urlFetch = baseUrl + '?filter=completed';
  }
  try {
    let response = await fetch(urlFetch, { method: 'GET' });
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
  taskState: {
    title?: string;
    isDone?: boolean;
  },
): Promise<void> {
  try {
    await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskState),
    });
  } catch (error) {
    console.log('Ошибка', error);
    throw error;
  }
}

export async function postToDo(title: string): Promise<void> {
  try {
    await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isDone: false, title: title }),
    });
  } catch (error) {
    console.log('Ошибка', error);
    throw error;
  }
}
