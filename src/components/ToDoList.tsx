import '../css/ToDolist.css';
import ToDoItem from './ToDoItem';
import { FetchFunc, MetaResponse, Todo, TodoInfo } from '../types/types';
import React from 'react';

const ToDoList: React.FC<{
  dataTasksAll: MetaResponse<Todo, TodoInfo>;
  getAndSetToDos: FetchFunc;
}> = ({ dataTasksAll, getAndSetToDos }) => {
  return (
    <ul className="todo-box">
      {dataTasksAll.data.map((task) => (
        <ToDoItem key={task.id} task={task} getAndSetToDos={getAndSetToDos} />
      ))}
    </ul>
  );
};

export default ToDoList;
