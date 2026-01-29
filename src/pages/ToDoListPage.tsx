import React, { useEffect, useState } from 'react';
import TabTasks from '../components/TabTasks';
import ToDoList from '../components/ToDoList';
import { baseUrl, getToDos, urlGetCompletedTask, urlGetInWorkTask } from '../api/api';
import AddTask from '../components/AddTask';
import { ActiveTabs, MetaResponse, Todo, TodoInfo } from '../types/types';

const ToDoListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTabs>('all');
  const [dataTasks, setDataTasks] = useState<MetaResponse<Todo, TodoInfo>>({
    data: [],
    info: {
      all: 0,
      completed: 0,
      inWork: 0,
    },
    meta: { totalAmount: 0 },
  });

  let urlFetch;
  if (activeTab === 'all') {
    urlFetch = baseUrl;
  } else if (activeTab === 'inWork') {
    urlFetch = urlGetInWorkTask;
  } else if (activeTab === 'complete') {
    urlFetch = urlGetCompletedTask;
  }

  async function getAndSetToDos(): Promise<void> {
    try {
      let dataTask = await getToDos(urlFetch);
      setDataTasks(dataTask);
    } catch (error) {
      alert(`Не удалось запросить данные с сервера ${error}`);
    }
  }

  useEffect(() => {
    getAndSetToDos();
  }, [activeTab]);

  useEffect(() => {
    const fetchInterval = setInterval(() => {
      getAndSetToDos();
    }, 5000);
    return () => clearInterval(fetchInterval);
  }, [activeTab]);

  return (
    <div className="wrapper">
      <AddTask getAndSetToDos={getAndSetToDos} />
      <TabTasks quantity={dataTasks.info} activeTab={activeTab} setActiveTab={setActiveTab} />
      <ToDoList dataTasksAll={dataTasks} getAndSetToDos={getAndSetToDos} className="tasks" />
    </div>
  );
};

export default ToDoListPage;
