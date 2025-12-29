import React, {useEffect, useState} from 'react';
import './../css/home.css'

const Home = ({rerender, render}) => {

    const [editingId, setIsEditingId] = useState(null)
    const [inputValue, setInputValue] = useState('')

    const [dataTasks, setDataTasks] = useState({
        data: [],
        info: {
            all: 0,
            completed: 0,
            inWork: 0
        }
    })


    useEffect(() => {
        fetch('https://easydev.club/api/v1/todos', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                    setDataTasks(data)
                    console.log('Успешно', data)
                }
            )
            .catch(error => console.log('Ошибка', error))
    }, [rerender])



    const handleEditing = (task) => {
        setIsEditingId(task.id)
        setInputValue(task.title)
    }

    const handleSave = (task) => {

        fetch(`https://easydev.club/api/v1/todos/${task.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: inputValue})
        })
            .then(res => res.json())
            .then(data => console.log('Успешно', data))
            .catch(error => console.log('Ошибка', error))
            .then(() => render())

        setIsEditingId(null)

    }

    const handleDeleting = (task) => {

        fetch(`https://easydev.club/api/v1/todos/${task.id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(data => console.log('Успешно', data))
            .catch(error => console.log('Ошибка', error))
            .then(() => render())
    }


    const handleCompleted = (task, targetValue) => {

        fetch(`https://easydev.club/api/v1/todos/${task.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({isDone: targetValue})
        })
            .then(res => res.json())
            .then(data => console.log('Успешно', data))
            .catch(error => console.log('Ошибка', error))
            .then(() => render())
    }



    return (
        <div>
            {dataTasks.data.map((task) => (
                <div key={task.id} className='taskEl'>
                    <input checked={task.isDone} onChange={(e) => handleCompleted(task, e.target.checked)} type="checkbox"/>
                    {editingId === task.id ? (
                        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                    ) : (
                        <div className={!task.isDone ? 'title' : 'title-completed'}>{task.title}</div>
                    )}
                    {editingId === task.id ? (
                    <button className='buttonEdit' onClick={() => handleSave(task)}>save</button>
                    ) : (
                    <button className='buttonEdit' onClick={() => {handleEditing(task)}}>Edit</button>
                    )}
                    <button className='buttonDelete' onClick={() => {handleDeleting(task)}}>Delete</button>

                </div>
            ))
            }
        </div>
    )
};

export default Home;