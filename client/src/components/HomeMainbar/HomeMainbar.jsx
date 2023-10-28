import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import './HomeMainbar.css'
import QuetionList from './QuetionList'

const HomeMainbar = () => {

  const location = useLocation()
  const user = 1
  const navigate = useNavigate()

  const questionsList  = useSelector(state => state.questionReducer)
  console.log(questionsList)

   /* var questionsList =[{
      _id: 1,
      UpVotes: 3,
      DownVotes: 2,
      noOfAnswers: 2,
      userId: 1,
      questionTitle: "What is a function?",
      questionBody: "It meant to be",
      questionTags: ["java", "node js", "react js", "mongo"],
      userPosted: "mano",
      askedOn: "jan 1",
      answer : [{
        answerBody: "Answer",
        userAnswered: 'Kumar',
        answeredOn: "jan 2",
        userId: 2
      }]
    },
      {
      _id: 2,
      UpVotes: 3,
      DownVotes: 2,
      noOfAnswers: 0,
      userId: 1,
      questionTitle: "What is a function?",
      questionBody: "It meant to be",
      questionTags: ["javascript", "R", "python"],
      userPosted: "mano",
      askedOn: "jan 1",
      answer : [{
        answerBody: "Answer",
        userAnswered: 'Kumar',
        answeredOn: "jan 2",
        userId: 2
      }]
      },
      {
      _id: 3,
      UpVotes: 3,
      DownVotes: 2,
      noOfAnswers: 0,
      userId: 1,
      questionTitle: "What is a function?",
      questionBody: "It meant to be",
      questionTags: ["javascript", "R", "python"],
      userPosted: "mano",
      askedOn: "jan 1",
      answer : [{
        answerBody: "Answer",
        userAnswered: 'Kumar',
        answeredOn: "jan 2",
        userId: 2
      }]}]
 */

  const checkAuth = () =>{
    if(user === null){
      alert("login or signup to ask a question")
      navigate('/Auth')
    }else{
      navigate('/AskQuestion')
    }
  }

  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        {
          location.pathname ==='/' ? <h1>Top Quetions</h1>:
          <h1>All Quetions</h1>
        }
        <button onClick={checkAuth} className='ask-btn'>Ask Quetions</button>
      </div>
      <div>
        {
          questionsList.data === null ?
          <h1>Loading ...</h1>:
          <>
            <p>{questionsList.data.length} Quetions</p>
            <QuetionList questionList = {questionsList.data}/>
            </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar