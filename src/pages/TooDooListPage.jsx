import React, { useState } from 'react';
import TabTasks from '../components/TabTasks.jsx';
import ToDoList from '../components/ToDoList.jsx';
import { deleteToDo, putToDo } from '../api/api.js';
import AddTask from '../components/AddTask.jsx';

const TooDooListPage = () => {
  const [editingId, setIsEditingId] = useState(null);
  const [toDoTitle, setToDoTitle] = useState('');
  const [rerender, setRerender] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [dataTasks, setDataTasks] = useState({
    data: [],
    info: {
      all: 0,
      completed: 0,
      inWork: 0,
    },
  });

  let textTask = '';

  const handleEditing = (task) => {
    textTask = toDoTitle;
    setIsEditingId(task.id);
    setToDoTitle(task.title);
  };

  const handleBackEditing = () => {
    setToDoTitle(textTask);
    setIsEditingId(null);
  };

  function render() {
    setRerender(!rerender);
  }

  const handleSave = async (task) => {
    if (toDoTitle.trim().length < 2 || toDoTitle.trim().length > 64) {
      alert('Количество символов должно быть не менее 2 и не более 64');
    } else {
      try {
        await putToDo(task.id, toDoTitle);
        await render();
        setIsEditingId(null);
      } catch (error) {
        alert(`Не удалось отправить запрос ${error}`);
      }
    }
  };

  const handleCompleted = async (task, targetValue) => {
    try {
      await putToDo(task.id, targetValue);
      await render();
    } catch (error) {
      alert(`не удалось отправить запрос о смене статуса задачи ${error}`);
    }
  };

  const handleDeleting = async (task) => {
    try {
      await deleteToDo(task.id);
      await render();
    } catch (error) {
      alert(`не удалось отправить запрос об удалении ${error}`);
    }
  };

  return (
    <div className="wrapper">
      <AddTask render={render} />
      <TabTasks
        quantity={dataTasks.info}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        rerender={render}
      />
      <ToDoList
        rerender={rerender}
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

export default TooDooListPage;
