import React, {useEffect, useState} from 'react';
import TabsToDos from '../components/TabsToDos';
import ToDoList from '../components/ToDoList';
import {getToDo} from '../api/api';
import AddToDo from '../components/AddToDo';
import {MetaResponse, TaskStatus, Todo, TodoInfo} from '../types/types';

const ToDoListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TaskStatus>(TaskStatus.ALL);
  const [dataTasks, setDataTasks] = useState<MetaResponse<Todo, TodoInfo>>({
    data: [],
    info: {
      all: 0,
      completed: 0,
      inWork: 0,
    },
    meta: { totalAmount: 0 },
  });

  useEffect(() => {
    updateToDos();
  }, [activeTab]);

  const updateToDos = async (): Promise<void> => {
    try {
      const dataTask = await getToDo(activeTab);
      setDataTasks(dataTask);
    } catch (error) {
      alert(`Не удалось запросить данные с сервера ${error}`);
    }
  };

  return (
    <div className="wrapper">
      <AddToDo onUpdate={updateToDos} />
      <TabsToDos quantity={dataTasks.info} activeTab={activeTab} setActiveTab={setActiveTab} />
      <ToDoList dataTasksAll={dataTasks} updateToDos={updateToDos} className="tasks" />
    </div>
  );
};

export default ToDoListPage;
