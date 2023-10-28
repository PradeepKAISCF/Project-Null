import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Navbar from './components/Navbar'
import Allroutes from './Allroute'
import { useEffect } from 'react';
import { fetchAllQuestion } from './actions/question';
import { useDispatch } from 'react-redux';
import { fetchAllUsers } from './actions/users';

function App() {
  
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchAllQuestion())
    dispatch(fetchAllUsers())
  }, [dispatch])

  return (
    <Router>
      <Navbar />
      <Allroutes />
    </Router>
  );
}

export default App;
