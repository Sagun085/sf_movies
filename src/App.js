import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './layout/index';
import Movies from './pages/movies';
import NoPage from './pages/noPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Movies />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
