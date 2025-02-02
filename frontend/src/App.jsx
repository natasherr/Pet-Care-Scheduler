import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NoPage from "./pages/NoPage"
import Profile from "./pages/Profile"
import Pets from "./pages/Pets"
import Appointments from "./pages/Appointments"
import Routines from "./pages/Routines"
import Supplies from "./pages/Supplies"
import { UserProvider } from './context/UserContext';
import { PetCareProvider } from './context/PetCareContext';


export default function App() {
  return (
    <BrowserRouter>

      <UserProvider>
        <PetCareProvider>
          
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="profile" element={<Profile />} />
                <Route path="pets" element={<Pets />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="routines" element={<Routines />} />
                <Route path="supplies" element={<Supplies />} />
                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>

        </PetCareProvider>
      </UserProvider>

    </BrowserRouter>
  )
}
