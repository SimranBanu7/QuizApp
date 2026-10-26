/*
  FILE: src/components/WelcomeScreen.jsx
  WHAT THIS FILE CARRIES:
  - First screen of the quiz: logo, "Are You Ready?" card, rules list and Start button.
  - STATIC VERSION: Start button just switches to the Question screen.
    It does NOT fetch questions from the backend.
*/

//dynamic :
// user opens : logo, rules, button
//click button : will create one function beginQuiz() call the api to fetch all questions
//while the api is loading ,btn can display starting the quiz
//when the api returns questions, handleResponse() rev the response.
//ProcessQuestions() stores the matched questions in context api
//showQuestionScreen() navigates to questions screen
//any errors handleError()
//welcomeScreen =>click start => fetcg questions from API => store question in context
//show the question screen




import React, { useCallback, useState } from 'react'
import QuizLogo from "./ui/QuizLogo"
import Card from "./ui/Card"
import Button from "./ui/Button"

import QuestionBubble from "../assets/question-bubble.png"
import GreenCheckMark from "../assets/check-circle-green.svg"

import fetchQuestionApi from "../api/fetchQuestionsApi"
import useQuestionContext from '../hooks/useQuestionContext'
import handleError from '../utils/handleError'

const WelcomeScreen = ({ showQuestionScreen }) => {
    
  const {processQuestions} = useQuestionContext(); //all qs saved in questionprocess
  const [loading, setLoading] = useState(false)

  //handle the response from API
  const handleResponse = useCallback(
    function(responseData){
      processQuestions(responseData.questions)
      showQuestionScreen()
    },
    [processQuestions,showQuestionScreen]
  )

  //start the quiz
  const beginQuiz = useCallback(
    function(){
      fetchQuestionApi(handleResponse,handleError,setLoading)

    },
    [handleResponse]
  )




  return (
    <section className='welcome-section'>
      <QuizLogo size="large" />
      <Card className="welcome-card">
        <div className='welcome-card-content-top'>
          <img src={QuestionBubble} width={172} alt="Question bubble" />
          <h2>Are You Ready?</h2>
          <h3>Let's see how many questions you can answer:</h3>
        </div>
        <ul className='welcome-card-list'>
          <li className='list-item'>
            <img src={GreenCheckMark} alt="green mark" />
            There are 30 Questions
          </li>
          <li className='list-item'>
            <img src={GreenCheckMark} alt="green check mark" />
            You need to pick 1 ans
          </li>
        </ul>
        <Button size="large" onClick={beginQuiz} loading={loading} loadText = "Starting the Quiz">
          I’m Ready - Start the Quiz
        </Button>
      </Card>
    </section>
  )
}

export default WelcomeScreen
