import React from 'react';
import '../css/TabTasks.css';

const TabTasks = ({ quantity = {}, setActiveTab, activeTab }) => {
  let active = 'active';
  let inActive = 'inActive';

  const { all = 0, completed = 0, inWork = 0 } = quantity;

  return (
    <nav>
      <div onClick={() => setActiveTab('all')} className={activeTab === 'all' ? active : inActive}>
        Всё ({all})
      </div>
      <div
        onClick={() => setActiveTab('inWork')}
        className={activeTab === 'inWork' ? active : inActive}
      >
        В работе ({inWork})
      </div>
      <div
        onClick={() => setActiveTab('complete')}
        className={activeTab === 'complete' ? active : inActive}
      >
        Сделано ({completed})
      </div>
    </nav>
  );
};

export default TabTasks;
