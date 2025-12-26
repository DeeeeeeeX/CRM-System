import React, {useEffect, useState} from 'react';
import './../css/home.css'

const InWork = () => {

    let urlGetInWorkTask = 'https://easydev.club/api/v1/todos?filter=inWork'
    const [dataTasks, setDataTasks] = useState({
        data: [],
        info: {
            all: 0,
            completed: 0,
            inWork: 0
        }
    })

    let data = dataTasks.data

    useEffect(() => {
        fetch(urlGetInWorkTask, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                    setDataTasks(data)
                    console.log('Успешно в работе', data)
                }
            )
            .catch(error => console.log('Ошибка в работе', error))
    }, [])

    return (
        <div>
            {data.map( (task) => (
                <div key={task.id} className='taskEl'>
                    <input type="checkbox" />
                    <div className='title'>{task.title}</div>
                    <button className='buttonEdit'>edit</button>
                    <button className='buttonDelete'>delete</button>
                </div>
            ))}
        </div>
    );
};

export default InWork;