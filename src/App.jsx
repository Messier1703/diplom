import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/clientRegistration/Register';
import PostApplication from './pages/postApplication/PostApplication';
import BrigadePage from './pages/brigadePage/BrigadePage';
import ManagerRegistration from './pages/auth/managerRegistration/ManagerRegistration';
import BrigadeRegistration from './pages/auth/brigadeRegistration/BrigadeRegistration';
import Paginator from './pages/admin/Admin';
import AllClients from './components/allClients/AllClients';
import ManagerPage from './pages/managerPage/ManagerPage';
import ClientProfile from './pages/clientProfile/ClientProfile';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/client-profile" element={<ClientProfile />} />
        <Route path="/post-application" element={<PostApplication />} />
        <Route path="/brigade-page" element={<BrigadePage />} />
        <Route path="/manager-registration" element={<ManagerRegistration />} />
        <Route path="/brigade-registration" element={<BrigadeRegistration />} />
        <Route path="/admin-page" element={<Paginator />} />
        <Route path="/all" element={<AllClients />} />
        <Route path="/manager-page" element={<ManagerPage />} />
      </Routes>
    </div>
  );
}

export default App;
