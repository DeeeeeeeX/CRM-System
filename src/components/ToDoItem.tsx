import React, { useState } from 'react';
import { deleteToDo, editToDo } from '../api/api.ts';
import { FetchFunc, Todo } from '../types/types';
import { validator } from '../functions/helpersFunc';

interface Props {
  task: Todo;
  updateToDos: FetchFunc;
}

const ToDoItem: React.FC<Props> = ({ task, updateToDos }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(task.title);

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

  const handleToggleStatus = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <li className="item">
      <label className="checkbox">
        <input checked={task.isDone} onChange={handleToggleStatus} type="checkbox" />
        <span></span>
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
          <button className="button-edit" onClick={handleSave}>
            <div className="save-svg"></div>
          </button>
          <button className="button-back" onClick={handleBackEditing}>
            <div className="back-svg"></div>
          </button>
        </>
      ) : (
        <>
          <button
            className="button-edit"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            <div className="edit-svg"></div>
          </button>
          <button className="button-delete" onClick={handleDeleting}>
            <div className="delete-svg"></div>
          </button>
        </>
      )}
    </li>
  );
};

export default ToDoItem;
