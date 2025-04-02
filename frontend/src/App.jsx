import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import WorkerList from './pages/WorkerList';
import WorkerDetails from './pages/WorkerDetails';
import CreateWorker from './pages/CreateWorker';    
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import ChoosePayment from './pages/ChoosePayment';
import AdminHome from './pages/AdminHome';  
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LogIn/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/> 
        <Route path="/workerList" element={<WorkerList/>}/>
        <Route path="/workerDetails" element={<WorkerDetails/>}/>
        <Route path='/admin' element={<AdminHome/>}/>
      </Routes>
    </Router>
  );
}

export default App
