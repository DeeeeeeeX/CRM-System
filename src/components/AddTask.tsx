import '../css/AddTask.css';
import { postToDo } from '../api/api.ts';
import { FetchFunc } from '../types/types';
import { Button, Form, FormProps, Input } from 'antd';

const AddTask: React.FC<{ getAndSetToDos: FetchFunc }> = ({ getAndSetToDos }) => {
  async function submitToDo(text: string): Promise<void> {
    try {
      await postToDo(text);
      await getAndSetToDos();
    } catch (error) {
      alert(`Не удалось добавить задачу ${error}`);
    }
  }

  type FieldType = {
    taskInput?: string;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    submitToDo(values.task);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    alert(`'Failed:, ${errorInfo.message}`);
  };

  return (
    <div>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ maxWidth: 800, justifyContent: 'right' }}
        validateTrigger={['onChange']}
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
          <Input placeholder="Task To Be Done" />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddTask;
