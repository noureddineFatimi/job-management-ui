import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./authentication/pages/login"
import Register from "./authentication/pages/register"
import Dashboard from "./admin/components/layout/dashboard"
import MyOffres from "./admin/pages/myOffres"
import Profil from "./admin/pages/profil"
import UpdateProfil from "./admin/pages/updateProfil"
import UpdatePassword from "./admin/pages/updatePassword"
import UpdateJobOffre from "./admin/pages/updateOffre"
import { Empty } from "antd"
import AddJobOffre from "./admin/pages/addJobOffre"
import Home from "./home/page/home"
import Job from "./job/pages/job"
import NotFound from "./notFound"

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="offres/:id_offre" element={<Job/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} >
        <Route index element={<Navigate to="offres" />} />
        <Route path="offres" element={<MyOffres />} />
        <Route path="offres/add" element={<AddJobOffre />} />
        <Route path="offres/edit/:id_offre" element={<UpdateJobOffre />} />
        <Route path="profil" element={<Profil />} />
        <Route path="profil/edit" element={<UpdateProfil />} />
        <Route path="profil/edit/password" element={<UpdatePassword />} />
        <Route path="*" element={<div style={{height:"100%", display:"flex",justifyContent:"center",alignItems:"center"}}> <Empty description="404 - Page introuvable"/></div>} />
      </Route>
      <Route path="/Not-found" element={<NotFound/>}/>
      <Route path="*" element={<Navigate to="/Not-found" />}/>
    </Routes>
  )
}

export default function Routeur() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
