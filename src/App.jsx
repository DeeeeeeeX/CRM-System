import './App.css'
import Input from "./components/Input.jsx";
import {Route, BrowserRouter as Router, Routes, Link} from 'react-router-dom';
import Home from "./components/Home.jsx";
import InWork from "./components/InWork.jsx";
import Complete from "./components/Complete.jsx";
import Navigation from "./components/Navigation.jsx";

function App() {

    return (
        <Router>
            <div className='wrapper'>
                <Input/>
                <Navigation/>
            </div>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/inWork' element={<InWork/>}/>
                <Route path='/complete' element={<Complete/>}/>
            </Routes>
        </Router>

    )
}

export default App
