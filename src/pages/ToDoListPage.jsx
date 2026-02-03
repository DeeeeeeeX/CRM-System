import React, { useEffect, useState } from 'react';
import TabTasks from '../components/TabTasks.jsx';
import ToDoList from '../components/ToDoList.jsx';
import { baseUrl, getToDos, urlGetCompletedTask, urlGetInWorkTask } from '../api/api.js';
import AddTask from '../components/AddTask.jsx';

const ToDoListPage = () => {
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
      let dataTask = await getToDos(urlFetch);
      setDataTasks(dataTask);
    } catch (error) {
      alert(`Не удалось запросить данные с сервера ${error}`);
    }
  }

  return (
    <div className="wrapper">
      <AddTask getAndSetToDos={getAndSetToDos} />
      <TabTasks quantity={dataTasks.info} activeTab={activeTab} setActiveTab={setActiveTab} />
      <ToDoList dataTasksAll={dataTasks} getAndSetToDos={getAndSetToDos} className="tasks" />
    </div>
  );
};

export default ToDoListPage;
