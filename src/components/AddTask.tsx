import React, { useState } from 'react';
import '../css/AddTask.css';
import { postToDo } from '../api/api.ts';
import { FetchFunc, ValidatorFunc } from '../types/types';

const AddTask: React.FC<{
  getAndSetToDos: FetchFunc;
  validator: ValidatorFunc;
}> = ({ getAndSetToDos, validator }) => {
  const [textTask, setTextTask] = useState<string>('');

  async function submitToDo(
    event: React.SubmitEvent<HTMLFormElement>,
    title: string,
  ): Promise<void> {
    event.preventDefault();
    if (validator(title)) {
      alert(validator(title));
      return;
    }
    try {
      await postToDo(title);
      await getAndSetToDos();
    } catch (error) {
      alert(`Не удалось добавить задачу ${error}`);
    }
  }

  return (
    <form onSubmit={(event) => submitToDo(event, textTask)} className="addPanel">
      <input
        type="text"
        value={textTask}
        onChange={(e) => setTextTask(e.target.value)}
        placeholder="Task To Be Done..."
      />
      <button>Add</button>
    </form>
  );
};

export default AddTask;
