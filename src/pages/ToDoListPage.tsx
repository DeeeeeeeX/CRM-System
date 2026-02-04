import React, { useCallback, useEffect, useState } from 'react';
import TabTasks from '../components/TabTasks';
import ToDoList from '../components/ToDoList';
import { getToDos } from '../api/api';
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

  const getAndSetToDos = useCallback(async (): Promise<void> => {
    try {
      let dataTask = await getToDos(activeTab);
      setDataTasks(dataTask);
    } catch (error) {
      alert(`Не удалось запросить данные с сервера ${error}`);
    }
  }, [activeTab]);

  useEffect(() => {
    getAndSetToDos();
    const fetchInterval = setInterval(() => {
      getAndSetToDos();
    }, 5000);
    return () => clearInterval(fetchInterval);
  }, [activeTab]);

  return (
    <div className="wrapper">
      <AddTask onUpdate={getAndSetToDos} />
      <TabTasks quantity={dataTasks.info} activeTab={activeTab} setActiveTab={setActiveTab} />
      <ToDoList dataTasksAll={dataTasks} getAndSetToDos={getAndSetToDos} className="tasks" />
    </div>
  );
};

export default ToDoListPage;
