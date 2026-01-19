import React, { useState } from 'react';
import '../css/AddTask.css';
import { postToDo } from '../api/api.js';

const AddTask = ({ getAndSetToDos }) => {
  const [textTask, setTextTask] = useState('');
  const [notification, setNotification] = useState(2);

  async function dispatchHandler(text) {
    if (text.trim().length < 2 || text.trim().length > 64) {
      setNotification(1);
    } else {
      try {
        setNotification(0);
        await postToDo(text);
        await getAndSetToDos();
      } catch (error) {
        alert(`Не удалось добавить задачу ${error}`);
      }
    }
    setTimeout(() => {
      setNotification(2);
    }, 2500);
  }

  return (
    <>
      <div className="addPanel">
        <input
          type="text"
          value={textTask}
          onChange={(e) => setTextTask(e.target.value)}
          placeholder="Task To Be Done..."
        />
        <button onClick={() => dispatchHandler(textTask)}>Add</button>
      </div>
      {notification === 1 ? (
        <div className="notification-fail">
          {' '}
          Не удалось добавить задачу количество символов минимум 2 максимум 64
        </div>
      ) : notification === 0 ? (
        <div className="notification-success"> Задача успешно добавлена </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default AddTask;
