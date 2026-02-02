import React, { useState } from 'react';
import '../css/AddTask.css';
import { postToDo } from '../api/api.ts';
import { FetchFunc, ValidatorFunc } from '../types/types';

const AddTask: React.FC<{
  onUpdate: FetchFunc;
  validator: ValidatorFunc;
}> = ({ onUpdate, validator }) => {
  const [textTask, setTextTask] = useState<string>('');

  async function submitToDo(event: React.SubmitEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (validator(textTask)) {
      alert(validator(textTask));
      return;
    }
    try {
      await postToDo(textTask);
      await onUpdate();
    } catch (error) {
      alert(`Не удалось добавить задачу ${error}`);
    }
  }

  return (
    <form onSubmit={submitToDo} className="addPanel">
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
