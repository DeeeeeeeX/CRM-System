import { createToDo } from '../../api/api.ts';
import { Button, Form, FormProps, Input, message } from 'antd';
import React, { memo } from 'react';
import { validateToDoLength } from '../../functions/validators';

interface Props {
  onUpdate: () => Promise<void>;
}

interface FieldType {
  task: string;
}

const AddToDo: React.FC<Props> = ({ onUpdate }) => {
  const onSubmitTodo: FormProps<FieldType>['onFinish'] = async (
    values: FieldType,
  ): Promise<void> => {
    try {
      await createToDo(values.task);
      await onUpdate();
    } catch (error) {
      message.error(`Не удалось создать задачу:, ${error.message}`);
    }
  };

  const onSubmitTodoFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    message.error(`Failed:, ${errorInfo.message}`);
  };

  return (
    <Form
      name="basic"
      onFinish={onSubmitTodo}
      onFinishFailed={onSubmitTodoFailed}
      autoComplete="off"
      validateTrigger={['submit']}
      layout="inline"
    >
      <Form.Item<FieldType>
        name="task"
        rules={[
          {
            validator(_, value) {
              return validateToDoLength(value);
            },
          },
        ]}
      >
        <Input placeholder="Task To Be Done" />
      </Form.Item>
      <Form.Item style={{ textAlign: 'right' }}>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(AddToDo);
