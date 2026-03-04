import React, { Dispatch, SetStateAction } from 'react';
import { ActiveTabs, TodoInfo } from '../types/types';
import { Tabs } from 'antd';

const TabsToDos: React.FC<{
  quantity: TodoInfo;
  setActiveTab: Dispatch<SetStateAction<ActiveTabs>>;
  activeTab: ActiveTabs;
}> = ({ quantity = {}, setActiveTab, activeTab }) => {
  const { all = 0, completed = 0, inWork = 0 } = quantity;

  const items = [
    {
      key: 'all',
      label: `Всё (${all})`,
    },
    {
      key: 'inWork',
      label: `В работе (${inWork})`,
    },
    {
      key: 'completed',
      label: `Сделано (${completed})`,
    },
  ];

  return <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)} items={items} />;
};

export default TabsToDos;
