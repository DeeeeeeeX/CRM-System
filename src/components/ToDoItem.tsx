import React, { useState } from 'react';
import { deleteToDo, putToDo } from '../api/api.ts';
import { FetchFunc, Todo } from '../types/types';

const ToDoItem: React.FC<{ task: Todo; getAndSetToDos: FetchFunc }> = ({
  task,
  getAndSetToDos,
}) => {
  const [editingIdArray, setEditingArrayId] = useState<number[]>([]);
  const [editingTitles, setEditingTitles] = useState<Map<number, string>>(new Map());

  const deletingIdArray = (item: Todo) => {
    setEditingArrayId((prev) => prev.filter((i) => i !== item.id));
  };

  const pushIdArray = (item: number) => {
    setEditingArrayId((prev) => [...prev, item]);
  };

  const setTitleMap = (id: number, title: string) => {
    setEditingTitles((prev) => {
      return new Map(prev).set(id, title);
    });
  };
  const handleEditing = (task: Todo) => {
    pushIdArray(task.id);
    setTitleMap(task.id, task.title);
  };

  const handleSave = async (task: Todo): Promise<void> => {
    if (editingTitles.get(task.id).trim().length < 2) {
      alert('Количество символов должно быть более 2');
    } else if (editingTitles.get(task.id).trim().length > 64) {
      alert('Количество символов должно быть менее 64');
    } else {
      try {
        await putToDo(task.id, editingTitles.get(task.id));
        await getAndSetToDos();
        deletingIdArray(task);
      } catch (error) {
        alert(`Не удалось отправить запрос ${error}`);
      }
    }
  };

  const handleBackEditing = (task: Todo) => {
    deletingIdArray(task);
  };

  const handleCompleted = async (task: Todo, targetValue: string) => {
    try {
      await putToDo(task.id, targetValue);
      await getAndSetToDos();
    } catch (error) {
      alert(`не удалось отправить запрос о смене статуса задачи ${error}`);
    }
  };

  const handleDeleting = async (task: Todo) => {
    try {
      await deleteToDo(task.id);
      await getAndSetToDos();
    } catch (error) {
      alert(`не удалось отправить запрос об удалении ${error}`);
    }
  };

  return (
    <div className="taskEl">
      <label className="checkbox">
        <input
          className="checkbox"
          checked={task.isDone}
          onChange={(e) => handleCompleted(task, e.target.checked)}
          type="checkbox"
        />
      </label>
      {editingIdArray.includes(task.id) ? (
        <input
          className="text-editing"
          type="text"
          value={editingTitles.get(task.id)}
          onChange={(e) => setTitleMap(task.id, e.target.value)}
        />
      ) : (
        <div className={!task.isDone ? 'title' : 'title-completed'}>{task.title}</div>
      )}
      {editingIdArray.includes(task.id) ? (
        <>
          <button className="buttonEdit" onClick={() => handleSave(task)}>
            <div className="saveSvg"></div>
          </button>
          <button className="buttonBack" onClick={() => handleBackEditing(task)}>
            <div className="backSvg"></div>
          </button>
        </>
      ) : (
        <>
          <button
            className="buttonEdit"
            onClick={() => {
              handleEditing(task);
            }}
          >
            <div className="editSvg"></div>
          </button>
          <button
            className="buttonDelete"
            onClick={async () => {
              await handleDeleting(task);
            }}
          >
            <div className="deleteSvg"></div>
          </button>
        </>
      )}
    </div>
  );
};

export default ToDoItem;
