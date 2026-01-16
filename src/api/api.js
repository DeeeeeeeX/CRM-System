export const baseUrl = 'https://easydev.club/api/v1/todos';

export async function getToDos(url, set) {
  try {
    fetch(url, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        set(data);
      });
  } catch (error) {
    console.log(error);
  }
}

export function putToDoSave(id, titleValue, render) {
  try {
    fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: titleValue }),
    }).then(() => render());
  } catch (error) {
    console.log('Ошибка', error);
  }
}

export function deleteToDo(id, render) {
  try {
    fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(() => render());
  } catch (error) {
    console.log('Ошибка', error);
  }
}

export function putTodoCompleted(id, value, render) {
  try {
    fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isDone: value }),
    }).then(() => render());
  } catch (error) {
    console.log('Ошибка', error);
  }
}

export function postToDo(text, render) {
  try {
    fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isDone: false, title: text }),
    }).then(() => render());
  } catch (error) {
    console.log('Ошибка', error);
  }
}
