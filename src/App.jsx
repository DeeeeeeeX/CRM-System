import './App.css'
import Input from "./components/Input.jsx";
import {Route, BrowserRouter as Router, Routes, Link, data} from 'react-router-dom';
import Home from "./components/Home.jsx";
import InWork from "./components/InWork.jsx";
import Complete from "./components/Complete.jsx";
import Navigation from "./components/Navigation.jsx";
import {useEffect, useState} from "react";

function App() {

    const [rerender, setRerender] = useState(false)

    function render()  {
        setRerender(!rerender)
    }

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

    return (
        <Router>
            <div className='wrapper'>
                <Input render={render}/>
                <Navigation quantity={dataTasks.info}/>
            <Routes>
                <Route path='/' element={<Home rerender={rerender} render={render} className='tasks'/>}/>
                <Route path='/inWork' element={<InWork className='tasks'/>}/>
                <Route path='/complete' element={<Complete className='tasks'/>}/>
            </Routes>
            </div>
        </Router>

    )
}

export default App
