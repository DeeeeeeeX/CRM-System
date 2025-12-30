import React, {useEffect, useState} from 'react';
import './../css/home.css'

const Complete = ({
                      rerender,
                      editingId,
                      inputValue,
                      setInputValue,
                      handleEditing,
                      handleSave,
                      handleDeleting,
                      handleCompleted,
                      handleBackEditing
                  }) => {

    let urlGetInWorkTask = 'https://easydev.club/api/v1/todos?filter=completed'
    const [dataTasksComplete, setDataTasksComplete] = useState({
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
                setDataTasksComplete(data)
                console.log('Успешно выполненные', data)
            })
            .catch(error => console.log('Ошибка с выполненными', error))
    }, [rerender])

    return (<div>
        {dataTasksComplete.data.map((task) => (<div key={task.id} className='taskEl'>
            <label className='checkbox'>
                <input className='checkbox' checked={task.isDone}
                       onChange={(e) => handleCompleted(task, e.target.checked)} type="checkbox"/>
            </label>
            {editingId === task.id ? (<input className='text-editing' type="text" value={inputValue}
                                             onChange={(e) => setInputValue(e.target.value)}/>) : (
                <div className={!task.isDone ? 'title' : 'title-completed'}>{task.title}</div>)}
            {editingId === task.id ? (<>
                <button className='buttonEdit' onClick={() => handleSave(task)}>Save</button>
                <button className='buttonBack' onClick={() => handleBackEditing()}>Back</button>
            </>) : (<>
                <button className='buttonEdit' onClick={() => {
                    handleEditing(task)
                }}>Edit
                </button>
                <button className='buttonDelete' onClick={() => {
                    handleDeleting(task)
                }}>Delete
                </button>
            </>)}
        </div>))}
    </div>)
};

export default Complete;