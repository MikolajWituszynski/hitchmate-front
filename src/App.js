import {Route, BrowserRouter, Routes} from 'react-router-dom'
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import HitchhikersPage from './components/HitchhikersPage/HitchhikersPage';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/hitchhikers" element={<HitchhikersPage/>}/>

    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;