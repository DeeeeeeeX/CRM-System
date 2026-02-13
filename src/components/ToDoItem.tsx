import React, { useState } from 'react';
import { deleteToDo, editToDo } from '../api/api.ts';
import { FetchFunc, Todo } from '../types/types';
import { validator } from '../functions/helpersFunc';

const ToDoItem: React.FC<{ task: Todo; updateToDos: FetchFunc }> = ({ task, updateToDos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleSave = async (): Promise<void> => {
    if (validator(title)) {
      alert(validator(title));
      return;
    }
    try {
      await editToDo(task.id, { title });
      await updateToDos();
      setIsEditing(false);
    } catch (error) {
      alert(`Не удалось отправить запрос ${error}`);
    }
  };

  const handleCompleted = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await editToDo(task.id, { isDone: e.target.checked });
      await updateToDos();
    } catch (error) {
      alert(`не удалось отправить запрос о смене статуса задачи ${error}`);
    }
  };

  const handleDeleting = async () => {
    try {
      await deleteToDo(task.id);
      await updateToDos();
    } catch (error) {
      alert(`не удалось отправить запрос об удалении ${error}`);
    }
  };

  const handleBackEditing = () => {
    setIsEditing(false);
    setTitle(task.title);
  };

  return (
    <li className="taskEl">
      <label className="checkbox">
        <input
          className="checkbox"
          checked={task.isDone}
          onChange={handleCompleted}
          type="checkbox"
        />
      </label>
      {isEditing ? (
        <input
          className="text-editing"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <div className={!task.isDone ? 'title' : 'title-completed'}>{task.title}</div>
      )}
      {isEditing ? (
        <>
          <button className="buttonEdit" onClick={handleSave}>
            <div className="saveSvg"></div>
          </button>
          <button className="buttonBack" onClick={handleBackEditing}>
            <div className="backSvg"></div>
          </button>
        </>
      ) : (
        <>
          <button
            className="buttonEdit"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            <div className="editSvg"></div>
          </button>
          <button className="buttonDelete" onClick={handleDeleting}>
            <div className="deleteSvg"></div>
          </button>
        </>
      )}
    </li>
  );
};

export default ToDoItem;
