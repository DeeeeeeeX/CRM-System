export const baseUrl = 'https://easydev.club/api/v1/todos';

export async function getToDos(url) {
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

export async function putToDoSave(id, titleValue, render) {
  try {
    await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: titleValue }),
    });
    await render();
  } catch (error) {
    console.log('Ошибка', error);
    throw error;
  }
}

export async function deleteToDo(id, render) {
  try {
    await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    await render();
  } catch (error) {
    console.log('Ошибка', error);
    throw error;
  }
}

export async function putTodoCompleted(id, value, render) {
  try {
    await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isDone: value }),
    });
    await render();
  } catch (error) {
    console.log('Ошибка', error);
    throw error;
  }
}

export async function postToDo(text, render) {
  try {
    await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isDone: false, title: text }),
    });
    await render();
  } catch (error) {
    console.log('Ошибка', error);
    throw error;
  }
}
