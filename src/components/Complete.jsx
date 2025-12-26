import React, {useEffect, useState} from 'react';
import './../css/home.css'

const Complete = () => {

    let urlGetInWorkTask = 'https://easydev.club/api/v1/todos?filter=completed'
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
                    console.log('Успешно выполненные', data)
                }
            )
            .catch(error => console.log('Ошибка с выполненными', error))
    }, [])

    return (
        <div>
            {data.map((task) => (
                <div key={task.id} className='taskEl'>
                    <input type="checkbox"/>
                    <div className='title'>{task.title}</div>
                    <button className='buttonEdit'>edit</button>
                    <button className='buttonDelete'>delete</button>
                </div>
            ))}
        </div>
    );
};

export default Complete;