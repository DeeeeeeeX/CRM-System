import React, {useState} from 'react';
import TabTasks from "../components/TabTasks.jsx";
import ToDoList from "../components/ToDoList.jsx";
import {deleteToDo, putTodoCompleted, putToDoSave} from "../api/api.js";
import AddTask from "../components/AddTask.jsx";

const TooDooListPage = () => {

    const [editingId, setIsEditingId] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [rerender, setRerender] = useState(false)
    const [activeTab, setActiveTab] = useState(1)
    const [dataTasks, setDataTasks] = useState({
        data: [], info: {
            all: 0, completed: 0, inWork: 0
        }
    })

    let textTask = ''

    const handleEditing = (task) => {
        textTask = inputValue
        setIsEditingId(task.id)
        setInputValue(task.title)
    }

    const handleBackEditing = () => {
        setInputValue(textTask)
        setIsEditingId(null)
    }

    function render() {
        setRerender(!rerender)
    }

    const handleSave = (task) => {
        if (inputValue.trim().length < 2 || inputValue.trim().length > 64) {
            alert('Количество символов должно быть не менее 2 и не более 64')
        } else {
            putToDoSave(task.id, inputValue, render)
            setIsEditingId(null)
        }
    }

    const handleDeleting = (task) => {
        deleteToDo(task.id, render)
    }

    const handleCompleted = (task, targetValue) => {
        putTodoCompleted(task.id, targetValue, render)
    }

    return (
        <div className='wrapper'>
            <AddTask render={render}/>
            <TabTasks quantity={dataTasks.info} setActiveTab={setActiveTab} activeTab={activeTab} rerender={render}/>
            <ToDoList
                rerender={rerender}
                editingId={editingId}
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleEditing={handleEditing}
                handleSave={handleSave}
                handleDeleting={handleDeleting}
                handleCompleted={handleCompleted}
                handleBackEditing={handleBackEditing}
                activeTab={activeTab}
                dataTasksAll={dataTasks}
                setDataTasksAll={setDataTasks}
                className='tasks'
            />
        </div>
    )
}

export default TooDooListPage;