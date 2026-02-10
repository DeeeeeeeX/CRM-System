import { ActiveTabs, MetaResponse, Todo, TodoInfo } from '../types/types';

export const baseUrl = 'https://easydev.club/api/v1/todos';

export async function getToDos(activeTab: ActiveTabs): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    let response = await fetch(baseUrl + `?filter=${activeTab}`, { method: 'GET' });
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function deleteToDo(id: number): Promise<void> {
  try {
    await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    throw error;
  }
}

export async function editToDo(
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
    throw error;
  }
}

export async function createToDo(title: string): Promise<void> {
  try {
    await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isDone: false, title }),
    });
  } catch (error) {
    throw error;
  }
}
