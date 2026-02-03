import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ToDoListPage from './pages/ToDoListPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ToDoListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
