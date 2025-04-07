import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WorkerList from './pages/WorkerList';
import WorkerDetails from './pages/WorkerDetails';
import CreateWorker from './pages/CreateWorker';    
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import ChoosePayment from './pages/ChoosePayment';
import AdminHome from './pages/AdminHome';
import Dashboard from './components/Dashboard';
import Carousel from './components/Carousel'; // ✅ Added
import Reviews from './components/Reviews'; // adjust path if it's in a different folder
import Workers from './components/Workers'; // adjust path if it's in a different folder


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LogIn />} />  
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<SignUp />} /> 
        <Route path='/workerList' element={<WorkerList />} />
        <Route path='/workerDetails' element={<WorkerDetails />} />
        <Route path='/createworker' element={<CreateWorker />} />
        <Route path='/choosepayment' element={<ChoosePayment />} />
        <Route path='/admin' element={<AdminHome />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/carousel' element={<Carousel />} /> {/* ✅ New Carousel Route */}
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/workers' element={<Workers/>}></Route>

      </Routes>
    </Router>
  );
}

export default App;
