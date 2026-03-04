import React, { useEffect, useState } from 'react';
import { deleteToDo, editToDo } from '../api/api.ts';
import { FetchFunc, FieldType, Todo } from '../types/types';
import { Button, Checkbox, Form, FormProps, Input, message } from 'antd';
import { validating } from '../functions/functions';

const ToDoItem: React.FC<{ task: Todo; updateToDos: FetchFunc }> = ({ task, updateToDos }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onSaveTitle = async (modifiedTodoTitle: FieldType) => {
    try {
      await editToDo(task.id, { title: modifiedTodoTitle.task?.trim() });
      setIsEditing(false);
      await updateToDos();
    } catch (error) {
      message.error(`Не удалось отправить запрос ${error}`);
    }
  };

  const onBackEditing = () => {
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

  const onFinish: FormProps<FieldType>['onFinish'] = (modifiedTodoTitle) => {
    onSaveTitle(modifiedTodoTitle);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    message.error(`Failed:, ${errorInfo.message}`);
  };

  useEffect(() => {
    form.setFieldsValue({ task: task.title });
  }, [isEditing]);

  return (
    <li className="taskEl">
      <Checkbox checked={task.isDone} onChange={(e) => onCompleted(e.target.checked)}></Checkbox>

      {isEditing ? (
        <Form
          form={form}
          name="edit"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateTrigger={['onChange']}
          initialValues={{ task: task.title }}
          className="editingForm"
        >
          <Form.Item<FieldType>
            name="task"
            style={{ width: 174, paddingLeft: 5, marginBottom: 0 }}
            rules={[
              {
                validator(_, value) {
                  return validating(value);
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

            <Button type="primary" className="buttonBack" onClick={onBackEditing}>
              <div className="backSvg"></div>
            </Button>
          </>
        </Form>
      ) : (
        <>
          <div className={!task.isDone ? 'title' : 'titleCompleted'}>{task.title}</div>
          <Button type="primary" className="buttonEdit" onClick={() => setIsEditing(true)}>
            <div className="editSvg"></div>
          </Button>

          <Button type="primary" className="buttonDelete" onClick={onDeleting}>
            <div className="deleteSvg"></div>
          </Button>
        </>
      )}
    </li>
  );
};

export default ToDoItem;
