import {createToDo} from '../api/api.ts';
import {FetchFunc, FieldType} from '../types/types';
import {Button, Form, FormProps, Input, message} from 'antd';
import React, {memo} from 'react';
import {validatingTrim} from "../functions/functions";

const AddToDo: React.FC<{ onUpdate: FetchFunc }> = ({onUpdate}) => {
  async function handleCreateTodo(title: string): Promise<void> {
    try {
      await createToDo(title);
      await onUpdate();
    } catch (error) {
      message.error(`Не удалось создать задачу:, ${error.message}`);
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
    <div>
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
                return validatingTrim(value)
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
    </div>
  );
};

export default memo(AddToDo);
