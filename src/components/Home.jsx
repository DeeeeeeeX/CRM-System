import React, {useEffect, useState} from 'react';
import './../css/home.css'

const Home = ({
                  rerender,
                  editingId,
                  inputValue,
                  setInputValue,
                  handleEditing,
                  handleSave,
                  handleDeleting,
                  handleCompleted
              }) => {

    const [dataTasksAll, setDataTasksAll] = useState({
        data: [], info: {
            all: 0, completed: 0, inWork: 0
        }
    })

    useEffect(() => {
        fetch('https://easydev.club/api/v1/todos', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setDataTasksAll(data)
                console.log('Успешно', data)
            })
            .catch(error => console.log('Ошибка', error))
    }, [rerender])

    return (<div>
        {dataTasksAll.data.map((task) => (<div key={task.id} className='taskEl'>
            <input checked={task.isDone} onChange={(e) => handleCompleted(task, e.target.checked)}
                   type="checkbox"/>
            {editingId === task.id ? (<input className='text-editing' type="text" value={inputValue}
                                             onChange={(e) => setInputValue(e.target.value)}/>) : (
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

export default Home;