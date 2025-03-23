import { useState,  } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import WorkerList from './pages/WorkerList';
import WorkerDetails from './pages/WorkerDetails';
import CreateWorker from './pages/CreateWorker';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import ChoosePayment from './pages/ChoosePayment';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/workerlist' element={<WorkerList/>}/>
        <Route path='/workerdetails' element={<WorkerDetails/>}/>
        <Route path='/createworker' element={<CreateWorker/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path='/choosepayment' element={<ChoosePayment/>}/>
        
      </Routes>
    </Router>
  );
}

export default App
