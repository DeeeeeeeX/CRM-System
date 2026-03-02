import React from 'react';
import '../css/TabTasks.css';
import { TaskStatus, TodoInfo } from '../types/types';

interface Props {
  quantity: TodoInfo;
  setActiveTab: (value: TaskStatus) => void;
  activeTab: TaskStatus;
}

const TabsToDos: React.FC<Props> = ({ quantity = {}, setActiveTab, activeTab }) => {
  const { all = 0, completed = 0, inWork = 0 } = quantity;

  return (
    <nav>
      <div
        onClick={() => setActiveTab(TaskStatus.ALL)}
        className={activeTab === 'all' ? 'active' : ''}
      >
        Всё ({all})
      </div>
      <div
        onClick={() => setActiveTab(TaskStatus.IN_WORK)}
        className={activeTab === 'inWork' ? 'active' : ''}
      >
        В работе ({inWork})
      </div>
      <div
        onClick={() => setActiveTab(TaskStatus.COMPLETED)}
        className={activeTab === 'completed' ? 'active' : ''}
      >
        Сделано ({completed})
      </div>
    </nav>
  );
};

export default TabsToDos;
