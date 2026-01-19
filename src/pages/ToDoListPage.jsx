import React, { useEffect, useState } from 'react';
import TabTasks from '../components/TabTasks.jsx';
import ToDoList from '../components/ToDoList.jsx';
import {
  baseUrl,
  deleteToDo,
  getToDos,
  putToDo,
  urlGetCompletedTask,
  urlGetInWorkTask,
} from '../api/api.js';
import AddTask from '../components/AddTask.jsx';

const ToDoListPage = () => {
  const [editingId, setIsEditingId] = useState(null);
  const [toDoTitle, setToDoTitle] = useState('');
  const [activeTab, setActiveTab] = useState(1);
  const [dataTasks, setDataTasks] = useState({
    data: [],
    info: {
      all: 0,
      completed: 0,
      inWork: 0,
    },
  });

  let getAndSetToDos = async () => {
    try {
      let dataTask = await getToDos(urlFetch);
      await setDataTasks(dataTask);
    } catch (error) {
      alert(`Не удалось запросить данные с сервера ${error}`);
    }
  };

  useEffect(() => {
    getAndSetToDos();
  }, []);

  let textTask = '';

  let urlFetch;
  if (activeTab === 1) {
    urlFetch = baseUrl;
  } else if (activeTab === 2) {
    urlFetch = urlGetInWorkTask;
  } else if (activeTab === 3) {
    urlFetch = urlGetCompletedTask;
  }

  const handleEditing = (task) => {
    textTask = toDoTitle;
    setIsEditingId(task.id);
    setToDoTitle(task.title);
  };

  const handleBackEditing = () => {
    setToDoTitle(textTask);
    setIsEditingId(null);
  };

  const handleSave = async (task) => {
    if (toDoTitle.trim().length < 2 || toDoTitle.trim().length > 64) {
      alert('Количество символов должно быть не менее 2 и не более 64');
    } else {
      try {
        await putToDo(task.id, toDoTitle);
        await getAndSetToDos();
        setIsEditingId(null);
      } catch (error) {
        alert(`Не удалось отправить запрос ${error}`);
      }
    }
  };

  const handleCompleted = async (task, targetValue) => {
    try {
      await putToDo(task.id, targetValue);
      await getAndSetToDos;
    } catch (error) {
      alert(`не удалось отправить запрос о смене статуса задачи ${error}`);
    }
  };

  const handleDeleting = async (task) => {
    try {
      await deleteToDo(task.id);
      await getAndSetToDos();
    } catch (error) {
      alert(`не удалось отправить запрос об удалении ${error}`);
    }
  };

  return (
    <div className="wrapper">
      <AddTask getAndSetToDos={getAndSetToDos} />
      <TabTasks
        quantity={dataTasks.info}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        getAndSetToDos={getAndSetToDos}
      />
      <ToDoList
        getAndSetToDos={getAndSetToDos}
        editingId={editingId}
        toDoTitle={toDoTitle}
        setToDoTitle={setToDoTitle}
        handleEditing={handleEditing}
        handleSave={handleSave}
        handleDeleting={handleDeleting}
        handleCompleted={handleCompleted}
        handleBackEditing={handleBackEditing}
        activeTab={activeTab}
        dataTasksAll={dataTasks}
        setDataTasksAll={setDataTasks}
        className="tasks"
      />
    </div>
  );
};

export default ToDoListPage;
