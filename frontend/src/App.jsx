import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WorkerList from './pages/WorkerList';
import WorkerDetails from './pages/WorkerDetails';
import CreateWorker from './pages/CreateWorker';    
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import ChoosePayment from './pages/ChoosePayment';
<<<<<<< HEAD
import AdminHome from './pages/AdminHome';  
import Successfull from './pages/Successfull';
import Notification from './pages/Notification';
=======
import AdminHome from './pages/AdminHome';
import Dashboard from './components/Dashboard';
import Carousel from './components/Carousel'; // ✅ Added
import Reviews from './components/Reviews'; // adjust path if it's in a different folder
import Workers from './components/Workers'; // adjust path if it's in a different folder


>>>>>>> da361266be449c5cc5fe7722e88f6896d8047d87
function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path='/' element={<LogIn/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/> 
        <Route path="/workerList" element={<WorkerList/>}/>
        <Route path="/workerDetails" element={<WorkerDetails/>}/>
        <Route path='/admin' element={<AdminHome/>}/>
        <Route path='/createworker' element={<CreateWorker/>}/>
        <Route path='/choosepayment' element={<ChoosePayment/>}/>
        <Route path='/successfull' element={<Successfull/>}/>
        <Route path='/notification' element={<Notification/>}/>
=======
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

>>>>>>> da361266be449c5cc5fe7722e88f6896d8047d87
      </Routes>
    </Router>
  );
}

export default App;
