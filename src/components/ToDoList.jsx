import React from 'react';
import '../css/ToDolist.css';
import ToDoItem from './ToDoItem.jsx';

const ToDoList = ({ dataTasksAll, getAndSetToDos }) => {
  return (
    <div>
      {dataTasksAll.data.map((task) => (
        <ToDoItem key={task.id} task={task} getAndSetToDos={getAndSetToDos} />
      ))}
    </div>
  );
};

export default ToDoList;
