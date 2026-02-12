import React, { useEffect, useState } from 'react';
import { deleteToDo, editToDo } from '../api/api.ts';
import { FetchFunc, FieldType, Todo } from '../types/types';
import { Button, Checkbox, Form, FormProps, Input, message } from 'antd';

const ToDoItem: React.FC<{ task: Todo; updateToDos: FetchFunc }> = ({ task, updateToDos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const handleSave = async (modifiedTodoTitle: FieldType) => {
    try {
      await editToDo(task.id, { title: modifiedTodoTitle.title?.trim() });
      setIsEditing(false);
      await updateToDos();
    } catch (error) {
      message.error(`Не удалось отправить запрос ${error}`);
    }
  };

  const handleBackEditing = () => {
    setIsEditing(false);
  };

  const handleCompleted = async (targetValue: boolean) => {
    try {
      await editToDo(task.id, { isDone: targetValue });
      await updateToDos();
    } catch (error) {
      message.error(`не удалось отправить запрос о смене статуса задачи ${error}`);
    }
  };

  const handleDeleting = async () => {
    try {
      await deleteToDo(task.id);
      await updateToDos();
    } catch (error) {
      message.error(`не удалось отправить запрос об удалении ${error}`);
    }
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (modifiedTodoTitle) => {
    console.log(modifiedTodoTitle.title);
    handleSave(modifiedTodoTitle);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    message.error(`Failed:, ${errorInfo.message}`);
  };

  useEffect(() => {
    form.setFieldsValue({ title: task.title });
  }, [isEditing]);

  return (
    <li className="taskEl">
      <Checkbox
        checked={task.isDone}
        onChange={(e) => handleCompleted(e.target.checked)}
      ></Checkbox>

      {isEditing ? (
        <Form
          form={form}
          name="edit"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateTrigger={['onChange']}
          initialValues={{ title: task.title }}
          className="editingForm"
        >
          <Form.Item<FieldType>
            name="title"
            style={{ width: 174, paddingLeft: 5, marginBottom: 0 }}
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
            <Input />
          </Form.Item>
          <>
            <Form.Item style={{ margin: 0 }}>
              <Button type="primary" htmlType="submit" className="buttonEdit">
                <div className="saveSvg"></div>
              </Button>
            </Form.Item>

            <Button type="primary" className="buttonBack" onClick={handleBackEditing}>
              <div className="backSvg"></div>
            </Button>
          </>
        </Form>
      ) : (
        <>
          <div className={!task.isDone ? 'title' : 'title-completed'}>{task.title}</div>
          <Button type="primary" className="buttonEdit" onClick={() => setIsEditing(true)}>
            <div className="editSvg"></div>
          </Button>

          <Button type="primary" className="buttonDelete" onClick={handleDeleting}>
            <div className="deleteSvg"></div>
          </Button>
        </>
      )}
    </li>
  );
};

export default ToDoItem;
