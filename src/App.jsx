import './App.css';
import Home from './pages/home/Home';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/clientRegistration/Register';
import ClientProfile from './pages/clientProfile/ClientProfile';
import { Route, Routes } from 'react-router-dom';
import PostApplication from './pages/postApplication/PostApplication';
import ManagerPage from './pages/managerPage/ManagerPage';
import BrigadePage from './pages/brigadePage/BrigadePage';
import ManagerRegistration from './pages/auth/managerRegistration/ManagerRegistration';
import BrigadeRegistration from './pages/auth/brigadeRegistration/BrigadeRegistration';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/client-profile" element={<ClientProfile />} />
        <Route path="/post-application" element={<PostApplication />} />
        <Route path="/brigade-page" element={<BrigadePage />} />
        <Route path="/manager-page" element={<ManagerPage />} />
        <Route path="/manager-registration" element={<ManagerRegistration />} />
        <Route path="brigade-registration" element={<BrigadeRegistration />} />
      </Routes>
    </div>
  );
}

export default App;
