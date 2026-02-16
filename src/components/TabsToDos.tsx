import React, { Dispatch, SetStateAction } from 'react';
import '../css/TabTasks.css';
import { ActiveTabs, TodoInfo } from '../types/types';

const TabsToDos: React.FC<{
  quantity: TodoInfo;
  setActiveTab: Dispatch<SetStateAction<ActiveTabs>>;
  activeTab: ActiveTabs;
}> = ({ quantity = {}, setActiveTab, activeTab }) => {
  const { all = 0, completed = 0, inWork = 0 } = quantity;

  return (
    <nav className="tabTasks">
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
        onClick={() => setActiveTab('completed')}
        className={activeTab === 'completed' ? 'active' : ''}
      >
        Сделано ({completed})
      </div>
    </nav>
  );
};

export default TabsToDos;
