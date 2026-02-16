import {createToDo} from '../api/api.ts';
import {FetchFunc, FieldType} from '../types/types';
import {Button, Form, FormProps, Input, message} from 'antd';
import React, {memo} from 'react';

const AddToDo: React.FC<{ onUpdate: FetchFunc }> = ({onUpdate}) => {
  async function handleCreateTodo(title: string): Promise<void> {
    try {
      await createToDo(title);
      await onUpdate();
    } catch (error) {
      message.error(`Failed:, ${error.message}`);
    }
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (!values.task) return;
    handleCreateTodo(values.task);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    message.error(`Failed:, ${errorInfo.message}`);
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      validateTrigger={['onChange']}
      layout="inline"
    >
      <Form.Item<FieldType>
        name="task"
        rules={[
          {
            validator(_, value) {
              if (value?.trim().length < 2) {
                return Promise.reject(new Error('must be at least 2 characters'));
              }
              if (value?.trim().length > 64) {
                return Promise.reject(new Error('cannot be longer than 64 characters'));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input placeholder="Task To Be Done"/>
      </Form.Item>
      <Form.Item style={{textAlign: 'right'}}>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(AddToDo);
