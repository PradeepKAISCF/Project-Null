import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Navbar from './components/Navbar'
import Allroutes from './Allroute'
import { useEffect } from 'react';
import { fetchAllQuestion } from './actions/question';
import { useDispatch } from 'react-redux';
import { fetchAllUsers } from './actions/users';
import Whether from './components/Whether'; 

function App() {
  
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchAllQuestion())
    dispatch(fetchAllUsers())
  }, [dispatch])

  return (
    <Router>
      <Navbar />
      <Whether/>
      <Allroutes />
    </Router>
  );
}

export default App;
