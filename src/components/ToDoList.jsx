import React from 'react';
import '../css/ToDolist.css';
import ToDoItem from './ToDoItem.jsx';

const ToDoList = (props) => {
  return (
    <div>
      {props.dataTasksAll.data.map((task) => (
        <ToDoItem
          key={task.id}
          task={task}
          editingId={props.editingId}
          toDoTitle={props.toDoTitle}
          setToDoTitle={props.setToDoTitle}
          handleEditing={props.handleEditing}
          handleSave={props.handleSave}
          handleDeleting={props.handleDeleting}
          handleCompleted={props.handleCompleted}
          handleBackEditing={props.handleBackEditing}
        />
      ))}
    </div>
  );
};

export default ToDoList;
