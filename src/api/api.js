export const baseUrl = 'https://easydev.club/api/v1/todos';
export const urlGetCompletedTask = 'https://easydev.club/api/v1/todos?filter=completed';
export const urlGetInWorkTask = 'https://easydev.club/api/v1/todos?filter=inWork';

export async function getToDos(url) {
  let data;
  try {
    let response = await fetch(url, { method: 'GET' });
    data = await response.json();
  } catch (error) {
    console.log('Ошибка', error);
    throw error;
  }
  return await data;
}

export async function deleteToDo(id) {
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

export async function putToDo(id, titleValue, isDoneValue) {
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

export async function postToDo(text) {
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
