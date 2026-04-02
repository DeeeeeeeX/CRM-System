import React, { useEffect, useState } from 'react';
import {
  ArrowRightOutlined,
  ColumnHeightOutlined,
  DownOutlined,
  FilterOutlined,
  MailOutlined,
  MoreOutlined,
  PhoneOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Dropdown, Flex, Input, List, MenuProps, Modal, Row, Space } from 'antd';
import { Roles, User } from '../types/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectUsersData } from '../store/selectors/usersSelectors';
import { fetchUsers, setFiltersAndFetchUsers } from '../store/reducers/ActionCreators';
import { useNavigate } from 'react-router-dom';
import { blockUserById, changeRightsUserById, deleteUserById, unblockUserById } from '../api/api';

const UsersPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [action, setAction] = useState<string>('');
  const [isUsernameAsc, setIsUsernameAsc] = useState<boolean>(true);
  const [isEmailAsc, setIsEmailAsc] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Типы фильтрации',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'blocked',
      label: 'Заблокирован',
      extra: '⌘',
    },
    {
      key: 'unblocked',
      label: 'Не заблокирован',
      extra: '⌘',
    },
    {
      key: 'all',
      label: 'Все',
      extra: '⌘',
    },
  ];

  const userOptions: MenuProps['items'] = [
    {
      key: 'admin',
      label: 'Дать роль админа',
    },
    {
      key: 'unAdmin',
      label: 'Забрать роль админа',
    },
    {
      key: 'delete',
      label: 'Удалить',
    },
  ];

  const users = useAppSelector(selectUsersData);
  const navigate = useNavigate();

  const onUserOptionsClick = (key: string, user: User): void => {
    setSelectedUser(user);
    setAction(key);
    setIsModalOpen(true);
  };

  const onUsernameClick = () => {
    isUsernameAsc
      ? dispatch(setFiltersAndFetchUsers({ sortBy: 'username', sortOrder: 'asc' }))
      : dispatch(setFiltersAndFetchUsers({ sortBy: 'username', sortOrder: 'desc' }));
    setIsUsernameAsc(!isUsernameAsc);
  };

  const onEmailClick = () => {
    isEmailAsc
      ? dispatch(setFiltersAndFetchUsers({ sortBy: 'email', sortOrder: 'asc' }))
      : dispatch(setFiltersAndFetchUsers({ sortBy: 'email', sortOrder: 'desc' }));
    setIsEmailAsc(!isEmailAsc);
  };

  const onSearch = (e) => {
    dispatch(setFiltersAndFetchUsers({ search: e.target.value }));
  };

  const onChangePage = (page) => {
    dispatch(setFiltersAndFetchUsers({ page: page }));
  };

  const navigateToEditUser = (id) => {
    navigate(`/editUser/${id}`);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getModalText = () => {
    if (!selectedUser) return '';
    switch (action) {
      case 'admin':
        return `Сделать ${selectedUser.username} админом?`;
      case 'unAdmin':
        return `Забрать роль админа у ${selectedUser.username}?`;
      case 'delete':
        return `Удалить ${selectedUser.username}?`;
      case 'unblock':
        return `Разблокировать ${selectedUser.username}?`;
      case 'block':
        return `Заблокировать ${selectedUser.username}?`;
      default:
        return '';
    }
  };

  const onMenuClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'blocked':
        dispatch(setFiltersAndFetchUsers({ isBlocked: true }));
        break;
      case 'unblocked':
        dispatch(setFiltersAndFetchUsers({ isBlocked: false }));
        break;
      case 'all':
        dispatch(setFiltersAndFetchUsers({ isBlocked: undefined }));
    }
  };

  const handleOk = async () => {
    if (!selectedUser) return;

    switch (action) {
      case 'admin':
        await changeRightsUserById(selectedUser.id, {
          roles: [Roles.USER, Roles.ADMIN],
        });
        break;
      case 'unAdmin':
        await changeRightsUserById(selectedUser.id, {
          roles: [Roles.USER],
        });
        break;
      case 'delete':
        await deleteUserById(selectedUser.id);
        break;
      case 'unblock':
        await unblockUserById(selectedUser.id);
        break;
      case 'block':
        await blockUserById(selectedUser.id);
        break;
    }
    dispatch(fetchUsers());
    setIsModalOpen(false);
  };

  return (
    <Flex gap="large" justify="space-around">
      <Card
        style={{ width: '100%' }}
        title="Пользователи"
        extra={
          <Flex align="center">
            <Input
              onChange={onSearch}
              size="large"
              placeholder="Поиск по имени или email"
              prefix={<SearchOutlined />}
            />
            <Dropdown menu={{ items, onClick: onMenuClick }}>
              <a onClick={(e) => e.preventDefault()}>
                <Flex gap={5}>
                  <FilterOutlined />
                  <div>Фильтры</div>
                  <DownOutlined />
                </Flex>
              </a>
            </Dropdown>
          </Flex>
        }
      >
        <List
          pagination={{
            hideOnSinglePage: true,
            defaultPageSize: 20,
            total: users?.meta?.totalAmount,
            onChange: onChangePage,
            showSizeChanger: false,
          }}
          header={
            <Row style={{ width: '100%' }} gutter={16}>
              <Col span={4}>
                <Space style={{ cursor: 'pointer' }} onClick={onUsernameClick}>
                  <div>Имя</div>
                  <ColumnHeightOutlined />
                </Space>
              </Col>
              <Col span={5}>
                <Space style={{ cursor: 'pointer' }} onClick={onEmailClick}>
                  <div>Email</div>
                  <ColumnHeightOutlined />
                </Space>
              </Col>
              <Col span={3}>
                <Space>
                  <div>Телефон</div>
                </Space>
              </Col>
              <Col span={3}>
                <div>Роли</div>
              </Col>
              <Col span={2}>
                <div>Блокировка</div>
              </Col>
              <Col span={3}>
                <div>Дата регистрации</div>
              </Col>
            </Row>
          }
          bordered
          dataSource={users?.data || []}
          renderItem={(item: User) => (
            <List.Item>
              <Row style={{ width: '100%' }} gutter={16}>
                <Col span={4}>
                  <Flex gap={5} align="center">
                    <UserOutlined />
                    <div>{item?.username}</div>
                  </Flex>
                </Col>
                <Col span={5}>
                  <Space>
                    <MailOutlined />
                    <div>{item.email}</div>
                  </Space>
                </Col>
                <Col span={3}>
                  <Space>
                    <PhoneOutlined />
                    <div>{item.phoneNumber ? item.phoneNumber : '-'}</div>
                  </Space>
                </Col>
                <Col span={3}>
                  <div>{item.roles.join(', ')}</div>
                </Col>
                <Col span={2}>
                  <div>{item.isBlocked ? '+' : '-'}</div>
                </Col>
                <Col span={3}>
                  <div> {item.date ? new Date(item.date).toLocaleDateString() : '-'}</div>
                </Col>
                <Col span={3}>
                  <Space>
                    <Button
                      type="primary"
                      onClick={(e) =>
                        onUserOptionsClick(item.isBlocked ? 'unblock' : 'block', item)
                      }
                    >
                      {item.isBlocked ? 'Разблокировать' : 'Заблокировать'}
                    </Button>
                    <Button onClick={() => navigateToEditUser(item.id)}>
                      <ArrowRightOutlined />
                    </Button>
                    <Dropdown
                      menu={{
                        items: userOptions,
                        onClick: (e) => onUserOptionsClick(e.key, item),
                      }}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <MoreOutlined />
                      </a>
                    </Dropdown>
                  </Space>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Card>
      <Modal
        title="Подтверждение:"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {getModalText()}
      </Modal>
    </Flex>
  );
};

export default UsersPage;
