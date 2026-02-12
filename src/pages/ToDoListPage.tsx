import React, { useCallback, useEffect, useState } from 'react';
import TabsToDos from '../components/TabsToDos';
import ToDoList from '../components/ToDoList';
import { getToDos } from '../api/api';
import AddToDo from '../components/AddToDo';
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

  const updateToDos = useCallback(async (): Promise<void> => {
    try {
      let dataTask = await getToDos(activeTab);
      setDataTasks(dataTask);
    } catch (error) {
      alert(`Не удалось запросить данные с сервера ${error}`);
    }
  }, [activeTab]);

  useEffect(() => {
    updateToDos();
    const fetchInterval = setInterval(() => {
      updateToDos();
    }, 5000);
    return () => clearInterval(fetchInterval);
  }, [activeTab]);

  return (
    <div className="wrapper">
      <AddToDo onUpdate={updateToDos} />
      <TabsToDos quantity={dataTasks.info} activeTab={activeTab} setActiveTab={setActiveTab} />
      <ToDoList dataTasksAll={dataTasks} updateToDos={updateToDos} className="tasks" />
    </div>
  );
};

export default ToDoListPage;
