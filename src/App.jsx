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
import Home from "./home/page/home copy"
import Job from "./job/pages/job"
import NotFound from "./notFound"
import UpdateJobOffreCoppy from "./admin/pages/updateOffre_copy"
import { lazy } from "react"
import ShowCandidatures from "./admin/pages/showCandidatures"
import CodeSource from "./admin/pages/codeSource"
import DeleteAccount from "./admin/pages/deleteAccount"
import Statistics from "./admin/pages/statistics"

const AddJobOffre = lazy(() => import("./admin/pages/addJobOffre"));

function App() {
  return (
    <Routes>
      <Route index element={<Home/>} />
      <Route path="/offres/:id_offre" element={<Job/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} >
        <Route index element={<Statistics/>} />
        <Route path="offres" element={<MyOffres />} />
        <Route path="offres/add" element={<AddJobOffre />} />
        <Route path="offres/edit/:id_offre" element={<UpdateJobOffreCoppy />} />
        <Route path="offres/:id_offre/applications" element={<ShowCandidatures/>} />
        <Route path="profil" element={<Profil />} />
        <Route path="profil/edit" element={<UpdateProfil />} />
        <Route path="profil/edit/password" element={<UpdatePassword />} />
        <Route path="profil/delete-account" element={<DeleteAccount />} />
        <Route path="code-source" element={<CodeSource/>} />
        <Route path="*" element={<div style={{height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}> <Empty description="404 - Page introuvable"/></div>} />
      </Route>
      <Route path="/Not-found" element={<NotFound/>}/>
      <Route path="*" element={<Navigate to="/Not-found" replace/>}/>
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
