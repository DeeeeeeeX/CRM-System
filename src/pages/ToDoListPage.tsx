import React, { useEffect, useState } from 'react';
import TabTasks from '../components/TabTasks';
import ToDoList from '../components/ToDoList';
import { getToDos } from '../api/api';
import AddTask from '../components/AddTask';
import { ActiveTabs, MetaResponse, Todo, TodoInfo, ValidatorFunc } from '../types/types';

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

  useEffect(() => {
    getAndSetToDos();
  }, [activeTab]);

  const getAndSetToDos = async (): Promise<void> => {
    try {
      const dataTask = await getToDos(activeTab);
      setDataTasks(dataTask);
    } catch (error) {
      alert(`Не удалось запросить данные с сервера ${error}`);
    }
  };

  const validator: ValidatorFunc = (text) => {
    if (text.trim().length < 2) {
      return 'Количество символов должно быть более 2';
    } else if (text.trim().length > 64) {
      return 'Количество символов должно быть менее 64';
    }
    return '';
  };

  return (
    <div className="wrapper">
      <AddTask onUpdate={getAndSetToDos} validator={validator} />
      <TabTasks quantity={dataTasks.info} activeTab={activeTab} setActiveTab={setActiveTab} />
      <ToDoList
        dataTasksAll={dataTasks}
        getAndSetToDos={getAndSetToDos}
        validator={validator}
        className="tasks"
      />
    </div>
  );
};

export default ToDoListPage;
