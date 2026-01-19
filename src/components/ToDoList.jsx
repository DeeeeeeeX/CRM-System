import React, { useEffect } from 'react';
import '../css/ToDolist.css';
import ToDoItem from './ToDoItem.jsx';
import { baseUrl, getToDos } from '../api/api.js';

const ToDoList = (props) => {
  const urlGetCompletedTask = 'https://easydev.club/api/v1/todos?filter=completed';
  const urlGetInWorkTask = 'https://easydev.club/api/v1/todos?filter=inWork';

  let urlFetch;
  if (props.activeTab === 1) {
    urlFetch = baseUrl;
  } else if (props.activeTab === 2) {
    urlFetch = urlGetInWorkTask;
  } else if (props.activeTab === 3) {
    urlFetch = urlGetCompletedTask;
  }

  async function getAndSetToDos() {
    try {
      let dataTask = await getToDos(urlFetch);
      props.setDataTasksAll(dataTask);
    } catch (error) {
      alert(`Не удалось запросить данные с сервера ${error}`);
    }
  }

  useEffect(() => {
    getAndSetToDos();
  }, [props.rerender]);

  return (
    <div>
      {props.dataTasksAll.data.map((task) => (
        <ToDoItem
          key={task.id}
          task={task}
          editingId={props.editingId}
          inputValue={props.inputValue}
          setInputValue={props.setInputValue}
          handleEditing={props.handleEditing}
          handleSave={props.handleSave}
          handleDeleting={props.handleDeleting}
          handleCompleted={props.handleCompleted}
          handleBackEditing={props.handleBackEditing}
        />
      ))}
    </div>
  );
};

export default ToDoList;
