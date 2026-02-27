import React, {useState} from 'react';
import '../css/AddTask.css';
import {createToDo} from '../api/api.ts';
import {FetchFunc} from '../types/types';
import {validator} from '../functions/helpersFunc';

interface Props {
  onUpdate: FetchFunc
}

const AddToDo: React.FC<Props> = ({onUpdate}) => {
  const [textTask, setTextTask] = useState<string>('');

  async function handleCreateTodo(event: React.SubmitEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (validator(textTask)) {
      alert(validator(textTask));
      return;
    }
    try {
      await createToDo(textTask);
      await onUpdate();
    } catch (error) {
      alert(`Не удалось добавить задачу ${error}`);
    }
  }

  return (
    <form onSubmit={handleCreateTodo} className="add-panel">
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

export default AddToDo;
