import React, { useState } from 'react';
import '../css/AddTask.css';
import { postToDo } from '../api/api.js';

const AddTask = ({ getAndSetToDos }) => {
  const [textTask, setTextTask] = useState('');

  async function dispatchHandler(text) {
    if (text.trim().length < 2) {
      alert('Количество символов должно быть более 2');
    } else if (text.trim().length > 64) {
      alert('Количество символов должно быть менее 64');
    } else {
      try {
        await postToDo(text);
        await getAndSetToDos();
      } catch (error) {
        alert(`Не удалось добавить задачу ${error}`);
      }
    }
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
    </>
  );
};

export default AddTask;
