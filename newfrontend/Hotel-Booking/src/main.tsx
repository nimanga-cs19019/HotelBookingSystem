import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './components/Home'
import './index.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Booking from './Booking'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/signin" element={<SignIn/>}></Route>
      <Route path="/booking" element={<Booking/>}></Route>
    </Routes>
  </Router>
  </StrictMode>,
)
