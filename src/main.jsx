import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Register from './authentication/pages/register'
import Login from './authentication/pages/login'
import Dashboard from './admin/components/layout/dashboard'
import AddJobOffre from './admin/pages/addJobOffre'
import Home from "./home/page/home"
import Job from "./job/pages/job"
import MyOffres from './admin/pages/myOffres'
import UpdateJobOffre from './admin/pages/updateOffre'
import Profil from './admin/pages/profil'
import UpdateProfil from './admin/pages/updateProfil'
import UpdatePassword from './admin/pages/updatePassword'
import Routeur from "./App"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routeur/>
  </StrictMode>
)