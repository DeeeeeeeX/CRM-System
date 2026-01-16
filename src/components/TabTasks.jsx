import React, { useEffect } from 'react';
import '../css/TabTasks.css';

const TabTasks = ({ quantity = {}, setActiveTab, activeTab, rerender }) => {
  let active = 'active';
  let inActive = 'inActive';

  let tabHandler = (tab) => {
    setActiveTab(tab);
    rerender();
  };

  const { all = 0, completed = 0, inWork = 0 } = quantity;

  useEffect(() => {}, [quantity]);

  return (
    <nav>
      <div onClick={() => tabHandler(1)} className={activeTab === 1 ? active : inActive}>
        Всё ({all})
      </div>
      <div onClick={() => tabHandler(2)} className={activeTab === 2 ? active : inActive}>
        В работе ({inWork})
      </div>
      <div onClick={() => tabHandler(3)} className={activeTab === 3 ? active : inActive}>
        Сделано ({completed})
      </div>
    </nav>
  );
};

export default TabTasks;
