import '../../css/ToDolist.css';
import ToDoItem from './ToDoItem';
import { MetaResponse, Todo, TodoInfo } from '../../types/types';
import React from 'react';
import { List } from 'antd';

interface Props {
  dataTasksAll: MetaResponse<Todo, TodoInfo>;
  updateToDos: () => void;
}

const ToDoList: React.FC<Props> = ({ dataTasksAll, updateToDos }) => {
  return (
    <List bordered className="todoBox">
      {dataTasksAll.data.map((task) => (
        <ToDoItem key={task.id} task={task} updateToDos={updateToDos} />
      ))}
    </List>
  );
};

export default ToDoList;
