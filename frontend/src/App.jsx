import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WorkerList from './pages/WorkerList';
import WorkerDetails from './pages/WorkerDetails';
import CreateWorker from './pages/CreateWorker';    
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import ChoosePayment from './pages/ChoosePayment';
import AdminHome from './pages/AdminHome';  
import Successfull from './pages/Successfull';
import Notification from './pages/Notification';
import Dashboard from './components/Dashboard';
import Carousel from './components/Carousel';
import Reviews from './components/Reviews';
import Workers from './components/Workers';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LogIn />} />  
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<SignUp />} /> 
        <Route path='/workerlist1' element={<WorkerList />} />
        <Route path='/workerdetails/:id' element={<WorkerDetails />} />
        <Route path='/createworker' element={<CreateWorker />} />
        <Route path='/choosepayment' element={<ChoosePayment />} />
        <Route path='/successfull' element={<Successfull />} />
        <Route path='/notification' element={<Notification />} />  
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/carousel' element={<Carousel />} />
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/workers' element={<Workers />} />
      </Routes>
    </Router>
  );
}

export default App;
