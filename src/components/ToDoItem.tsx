import React, { useState } from 'react';
import { deleteToDo, putToDo } from '../api/api.ts';
import { FetchFunc, Todo } from '../types/types';
import { Button, Checkbox, Form, Input } from 'antd';

const ToDoItem: React.FC<{ task: Todo; getAndSetToDos: FetchFunc }> = ({
  task,
  getAndSetToDos,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleSave = async () => {
    if (title.trim().length < 2) {
      alert('Количество символов должно быть более 2');
    } else if (title.trim().length > 64) {
      alert('Количество символов должно быть менее 64');
    } else {
      try {
        await putToDo(task.id, title.trim());
        setIsEditing(false);
        await getAndSetToDos();
      } catch (error) {
        alert(`Не удалось отправить запрос ${error}`);
      }
    }
  };

  const handleCompleted = async (targetValue: boolean) => {
    try {
      await putToDo(task.id, targetValue);
      await getAndSetToDos();
    } catch (error) {
      alert(`не удалось отправить запрос о смене статуса задачи ${error}`);
    }
  };

  const handleDeleting = async () => {
    try {
      await deleteToDo(task.id);
      await getAndSetToDos();
    } catch (error) {
      alert(`не удалось отправить запрос об удалении ${error}`);
    }
  };

  return (
    <div className="taskEl">
      <Checkbox
        checked={task.isDone}
        onChange={(e) => handleCompleted(e.target.checked)}
      ></Checkbox>

      {isEditing ? (
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      ) : (
        <div className={!task.isDone ? 'title' : 'title-completed'}>{task.title}</div>
      )}

      {isEditing ? (
        <>
          <Button type="primary" className="buttonEdit" onClick={handleSave}>
            <div className="saveSvg"></div>
          </Button>

          <Button type="primary" className="buttonBack" onClick={() => setIsEditing(false)}>
            <div className="backSvg"></div>
          </Button>
        </>
      ) : (
        <>
          <Button type="primary" className="buttonEdit" onClick={() => setIsEditing(true)}>
            <div className="editSvg"></div>
          </Button>

          <Button type="primary" className="buttonDelete" onClick={handleDeleting}>
            <div className="deleteSvg"></div>
          </Button>
        </>
      )}
    </div>
  );
};

export default ToDoItem;
