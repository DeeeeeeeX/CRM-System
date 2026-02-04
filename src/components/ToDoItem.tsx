import React, { useEffect, useState } from 'react';
import { deleteToDo, putToDo } from '../api/api.ts';
import { FetchFunc, FieldType, Todo } from '../types/types';
import { Button, Checkbox, Form, FormProps, Input } from 'antd';

const ToDoItem: React.FC<{ task: Todo; getAndSetToDos: FetchFunc }> = ({
  task,
  getAndSetToDos,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [form] = Form.useForm();

  const handleSave = async () => {
    try {
      await putToDo(task.id, { title: title.trim() });
      setIsEditing(false);
      await getAndSetToDos();
    } catch (error) {
      alert(`Не удалось отправить запрос ${error}`);
    }
  };

  const handleBackEditing = () => {
    setTitle(task.title);
    setIsEditing(false);
  };

  const handleCompleted = async (targetValue: boolean) => {
    try {
      await putToDo(task.id, { isDone: targetValue });
      await getAndSetToDos();
    } catch (error) {
      alert(`не удалось отправить запрос о смене статуса задачи ${error}`);
    }
  };

  const handleDeleting = async () => {
    try {
      await deleteToDo(task.id);
      await getAndSetToDos();
    } catch (error) {
      alert(`не удалось отправить запрос об удалении ${error}`);
    }
  };

  const onFinish: FormProps<FieldType>['onFinish'] = () => {
    handleSave();
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    alert(`Failed:, ${errorInfo.message}`);
  };

  useEffect(() => {
    form.setFieldsValue({ title });
  }, [title]);

  return (
    <li className="taskEl">
      <Checkbox
        checked={task.isDone}
        onChange={(e) => handleCompleted(e.target.checked)}
      ></Checkbox>

      {isEditing ? (
        <Form
          name="edit"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateTrigger={['onChange']}
          initialValues={{ title }}
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
            <Input
              onChange={(e) => setTitle(e.target.value)}
              status={title.length < 2 || title.length > 64 ? 'error' : 'success'}
            />
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
