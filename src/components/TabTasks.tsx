import React, { Dispatch, SetStateAction } from 'react';
import '../css/TabTasks.css';
import { TodoInfo } from '../types/types';

const TabTasks: React.FC<{
  quantity: TodoInfo;
  setActiveTab: Dispatch<SetStateAction<string>>;
  activeTab: string;
}> = ({ quantity = {}, setActiveTab, activeTab }) => {
  const { all = 0, completed = 0, inWork = 0 } = quantity;

  return (
    <nav>
      <div onClick={() => setActiveTab('all')} className={activeTab === 'all' ? 'active' : ''}>
        Всё ({all})
      </div>
      <div
        onClick={() => setActiveTab('inWork')}
        className={activeTab === 'inWork' ? 'active' : ''}
      >
        В работе ({inWork})
      </div>
      <div
        onClick={() => setActiveTab('complete')}
        className={activeTab === 'complete' ? 'active' : ''}
      >
        Сделано ({completed})
      </div>
    </nav>
  );
};

export default TabTasks;
