import './App.css'
import Input from "./components/Input.jsx";
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from "./components/Home.jsx";
import InWork from "./components/InWork.jsx";
import Complete from "./components/Complete.jsx";
import Navigation from "./components/Navigation.jsx";
import {useEffect, useState} from "react";

function App() {

    const [editingId, setIsEditingId] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [rerender, setRerender] = useState(false)
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

    useEffect(() => {
        fetch('https://easydev.club/api/v1/todos', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setDataTasks(data)
                console.log('Успешно', data)
            })
            .catch(error => console.log('Ошибка', error))
    }, [rerender])

    const handleSave = (task) => {
        console.log(inputValue.trim().length)
        if (inputValue.trim().length < 2 || inputValue.trim().length > 64) {
            alert('Количество символов должно быть не менее 2 и не более 64')
        } else {
            fetch(`https://easydev.club/api/v1/todos/${task.id}`, {
                method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({title: inputValue})
            })
                .then(res => res.json())
                .then(data => console.log('Успешно', data))
                .catch(error => console.log('Ошибка', error))
                .then(() => render())
            setIsEditingId(null)
        }
    }

    const handleDeleting = (task) => {

        fetch(`https://easydev.club/api/v1/todos/${task.id}`, {
            method: 'DELETE', headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(data => console.log('Успешно', data))
            .catch(error => console.log('Ошибка', error))
            .then(() => render())
    }

    const handleCompleted = (task, targetValue) => {

        fetch(`https://easydev.club/api/v1/todos/${task.id}`, {
            method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({isDone: targetValue})
        })
            .then(res => res.json())
            .then(data => console.log('Успешно', data))
            .catch(error => console.log('Ошибка', error))
            .then(() => render())
    }

    return (<Router>
            <div className='wrapper'>
                <Input render={render}/>
                <Navigation quantity={dataTasks.info}/>
                <Routes>
                    <Route path='/' element={<Home
                        rerender={rerender}
                        editingId={editingId}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        handleEditing={handleEditing}
                        handleSave={handleSave}
                        handleDeleting={handleDeleting}
                        handleCompleted={handleCompleted}
                        handleBackEditing={handleBackEditing}
                        className='tasks'
                    />}/>
                    <Route path='/inWork' element={<InWork
                        rerender={rerender}
                        editingId={editingId}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        handleEditing={handleEditing}
                        handleSave={handleSave}
                        handleDeleting={handleDeleting}
                        handleCompleted={handleCompleted}
                        handleBackEditing={handleBackEditing}
                        className='tasks'
                    />}/>
                    <Route path='/complete' element={<Complete
                        rerender={rerender}
                        editingId={editingId}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        handleEditing={handleEditing}
                        handleSave={handleSave}
                        handleDeleting={handleDeleting}
                        handleCompleted={handleCompleted}
                        handleBackEditing={handleBackEditing}
                        className='tasks'
                    />}/>
                </Routes>
            </div>
        </Router>

    )
}

export default App
