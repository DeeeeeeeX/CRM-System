import React from 'react';
import '../css/ToDolist.css';
import ToDoItem from './ToDoItem';
import { FetchFunc, MetaResponse, Todo, TodoInfo, ValidatorFunc } from '../types/types';

const ToDoList: React.FC<{
  dataTasksAll: MetaResponse<Todo, TodoInfo>;
  getAndSetToDos: FetchFunc;
  validator: ValidatorFunc;
}> = ({ dataTasksAll, getAndSetToDos, validator }) => {
  return (
    <div>
      {dataTasksAll.data.map((task) => (
        <ToDoItem key={task.id} task={task} getAndSetToDos={getAndSetToDos} validator={validator} />
      ))}
    </div>
  );
};

export default ToDoList;
