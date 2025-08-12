import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Job from './job/pages/job'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Job idOffre={1}/>
  </StrictMode>
)