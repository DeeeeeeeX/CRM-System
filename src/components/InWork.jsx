import React, {useEffect, useState} from 'react';
import './../css/home.css'

const InWork = ({
                    rerender,
                    editingId,
                    inputValue,
                    setInputValue,
                    handleEditing,
                    handleSave,
                    handleDeleting,
                    handleCompleted
                }) => {

    let urlGetInWorkTask = 'https://easydev.club/api/v1/todos?filter=inWork'
    const [dataTasksInWork, setDataTasksInWork] = useState({
        data: [], info: {
            all: 0, completed: 0, inWork: 0
        }
    })

    useEffect(() => {
        fetch(urlGetInWorkTask, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setDataTasksInWork(data)
                console.log('Успешно в работе', data)
            })
            .catch(error => console.log('Ошибка в работе', error))
    }, [rerender])

    return (<div>
        {dataTasksInWork.data.map((task) => (<div key={task.id} className='taskEl'>
            <input checked={task.isDone} onChange={(e) => handleCompleted(task, e.target.checked)}
                   type="checkbox"/>
            {editingId === task.id ? (
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>) : (
                <div className={!task.isDone ? 'title' : 'title-completed'}>{task.title}</div>)}
            {editingId === task.id ? (<button className='buttonEdit' onClick={() => handleSave(task)}>save</button>) : (
                <button className='buttonEdit' onClick={() => {
                    handleEditing(task)
                }}>Edit</button>)}
            <button className='buttonDelete' onClick={() => {
                handleDeleting(task)
            }}>Delete
            </button>

        </div>))}
    </div>)
};

export default InWork;