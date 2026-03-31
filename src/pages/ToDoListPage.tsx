import React, { useCallback, useEffect, useState } from 'react';
import TabsToDos from '../components/Todos/TabsToDos';
import ToDoList from '../components/Todos/ToDoList';
import { getToDos } from '../api/api';
import AddToDo from '../components/Todos/AddToDo';
import { ActiveTabs, MetaResponse, Todo, TodoInfo } from '../types/types';
import { Flex, message } from 'antd';
import { useAppSelector } from '../store/hooks';

const ToDoListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTabs>('all');
  const [dataTasks, setDataTasks] = useState<MetaResponse<Todo, TodoInfo>>({
    data: [{ id: 1, title: 'loading ...', created: '2026-02-16T13:02:32.953831Z', isDone: false }],
    info: {
      all: 0,
      completed: 0,
      inWork: 0,
    },
    meta: { totalAmount: 0 },
  });

  const { isLoginChecked } = useAppSelector((state) => state.authReducer);

  const updateToDos = useCallback(async (): Promise<void> => {
    try {
      let dataTask = await getToDos(activeTab);
      setDataTasks(dataTask);
    } catch (error) {
      message.error(`Не удалось запросить данные с сервера ${error}`);
    }
  }, [activeTab]);

  useEffect(() => {
    if (!isLoginChecked) return;
    updateToDos();
    const fetchInterval = setInterval(() => {
      updateToDos();
    }, 5000);
    return () => clearInterval(fetchInterval);
  }, [updateToDos, isLoginChecked]);

  return (
    <Flex vertical align="center" gap="large" style={{ paddingTop: 50 }}>
      <AddToDo onUpdate={updateToDos} />
      <TabsToDos quantity={dataTasks.info} activeTab={activeTab} setActiveTab={setActiveTab} />
      <ToDoList dataTasksAll={dataTasks} updateToDos={updateToDos} className="tasks" />
    </Flex>
  );
};

export default ToDoListPage;
