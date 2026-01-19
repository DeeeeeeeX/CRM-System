import './App.css';
import TooDooListPage from './pages/TooDooListPage.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TooDooListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
