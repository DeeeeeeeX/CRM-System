import React, { useEffect, useLayoutEffect, useState } from 'react';
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
  const [editingIdArray, setEditingArrayId] = useState([]);
  const [editingTitles, setEditingTitles] = useState(new Map());
  const [activeTab, setActiveTab] = useState('all');
  const [dataTasks, setDataTasks] = useState({
    data: [],
    info: {
      all: 0,
      completed: 0,
      inWork: 0,
    },
  });

  let urlFetch;
  if (activeTab === 'all') {
    urlFetch = baseUrl;
  } else if (activeTab === 'inWork') {
    urlFetch = urlGetInWorkTask;
  } else if (activeTab === 'complete') {
    urlFetch = urlGetCompletedTask;
  }

  useEffect(() => {
    getAndSetToDos();
  }, [activeTab]);

  async function getAndSetToDos() {
    try {
      console.log(activeTab);
      console.log(urlFetch);
      let dataTask = await getToDos(urlFetch);
      setDataTasks(dataTask);
    } catch (error) {
      alert(`Не удалось запросить данные с сервера ${error}`);
    }
  }

  const pushIdArray = (item) => {
    setEditingArrayId((prev) => [...prev, item]);
  };

  const setTitleMap = (id, title) => {
    setEditingTitles((prev) => {
      return new Map(prev).set(id, title);
    });
  };

  const deletingIdArray = (item) => {
    setEditingArrayId((prev) => prev.filter((i) => i !== item.id));
  };

  const deletingTitledArray = (item) => {
    setEditingArrayId((prev) => prev.filter((i) => i !== item.id));
  };

  const handleEditing = (task) => {
    pushIdArray(task.id);
    setTitleMap(task.id, task.title);
  };

  const handleBackEditing = (task) => {
    console.log(editingTitles.get(task.id));
    deletingIdArray(task);
  };

  const handleSave = async (task) => {
    if (
      editingTitles.get(task.id).trim().length < 2 ||
      editingTitles.get(task.id).trim().length > 64
    ) {
      alert('Количество символов должно быть не менее 2 и не более 64');
    } else {
      try {
        await putToDo(task.id, editingTitles.get(task.id));
        await getAndSetToDos();
        deletingIdArray(task);
      } catch (error) {
        alert(`Не удалось отправить запрос ${error}`);
      }
    }
  };

  const handleCompleted = async (task, targetValue) => {
    try {
      await putToDo(task.id, targetValue);
      await getAndSetToDos();
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
      <TabTasks quantity={dataTasks.info} activeTab={activeTab} setActiveTab={setActiveTab} />
      <ToDoList
        getAndSetToDos={getAndSetToDos}
        handleEditing={handleEditing}
        handleSave={handleSave}
        handleDeleting={handleDeleting}
        handleCompleted={handleCompleted}
        handleBackEditing={handleBackEditing}
        activeTab={activeTab}
        dataTasksAll={dataTasks}
        setDataTasksAll={setDataTasks}
        editingIdArray={editingIdArray}
        deletingTitledArray={deletingTitledArray}
        editingTitles={editingTitles}
        setTitleMap={setTitleMap}
        className="tasks"
      />
    </div>
  );
};

export default ToDoListPage;
