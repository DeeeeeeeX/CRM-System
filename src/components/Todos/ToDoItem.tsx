import React, { useEffect, useState } from 'react';
import { deleteToDo, editToDo } from '../../api/api.ts';
import { Button, Checkbox, Form, FormProps, Input, List, message } from 'antd';
import { Todo } from '../../types/types';

interface Props {
  task: Todo;
  updateToDos: () => Promise<void>;
}

interface FieldType {
  task: string;
}

const ToDoItem: React.FC<Props> = ({ task, updateToDos }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [form] = Form.useForm();

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const onCompleted = async (targetValue: boolean) => {
    try {
      await editToDo(task.id, { isDone: targetValue });
      await updateToDos();
    } catch (error) {
      message.error(`не удалось отправить запрос о смене статуса задачи ${error}`);
    }
  };

  const onDeleting = async () => {
    try {
      await deleteToDo(task.id);
      await updateToDos();
    } catch (error) {
      message.error(`не удалось отправить запрос об удалении ${error}`);
    }
  };

  const onSubmitEditTodo: FormProps<FieldType>['onFinish'] = async (
    modifiedTodoTitle: FieldType,
  ) => {
    try {
      await editToDo(task.id, { title: modifiedTodoTitle.task });
      setIsEditing(false);
      await updateToDos();
    } catch (error: unknown) {
      message.error(`Не удалось отправить запрос ${error}`);
    }
  };

  const onSubmitEditTodoFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    message.error(`Failed:, ${errorInfo.message}`);
  };

  useEffect(() => {
    form.setFieldsValue({ task: task.title });
  }, [isEditing, task.title]);

  return (
    <List.Item>
      <Checkbox checked={task.isDone} onChange={(e) => onCompleted(e.target.checked)}></Checkbox>

      {isEditing ? (
        <Form
          form={form}
          name="edit"
          onFinish={onSubmitEditTodo}
          onFinishFailed={onSubmitEditTodoFailed}
          autoComplete="off"
          initialValues={{ task: task.title }}
          className="editing-form"
        >
          <Form.Item<FieldType>
            name="task"
            style={{ width: 174, paddingLeft: 5, marginBottom: 0 }}
            rules={[
              { required: true, message: 'Введите задачу' },
              { min: 2, message: 'Минимум 2 символа' },
              { max: 64, message: 'Максимум 64 символа' },
              { whitespace: true, message: 'Не может быть пустым' },
            ]}
          >
            <Input />
          </Form.Item>
          <>
            <Form.Item style={{ margin: 0 }}>
              <Button type="primary" htmlType="submit" className="button-edit">
                <div className="save-svg"></div>
              </Button>
            </Form.Item>

            <Button type="primary" className="button-back" onClick={cancelEditing}>
              <div className="back-svg"></div>
            </Button>
          </>
        </Form>
      ) : (
        <>
          <div className={!task.isDone ? 'title' : 'title-completed'}>{task.title}</div>
          <Button type="primary" className="button-edit" onClick={() => setIsEditing(true)}>
            <div className="edit-svg"></div>
          </Button>

          <Button type="primary" className="button-delete" onClick={onDeleting}>
            <div className="delete-svg"></div>
          </Button>
        </>
      )}
    </List.Item>
  );
};

export default ToDoItem;
