import React from 'react';
import '../css/ToDolist.css';
import ToDoItem from './ToDoItem';
import {FetchFunc, MetaResponse, Todo, TodoInfo} from '../types/types';

interface Props {
  dataTasksAll: MetaResponse<Todo, TodoInfo>;
  updateToDos: FetchFunc;
}

const ToDoList: React.FC<Props> = ({dataTasksAll, updateToDos}) => {
  return (
    <ul>
      {dataTasksAll.data.map((task) => (
        <ToDoItem key={task.id} task={task} updateToDos={updateToDos}/>
      ))}
    </ul>
  );
};

export default ToDoList;
