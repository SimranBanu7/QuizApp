//makes the data available to all components

//brain of our quiz application
//1. Get the questions from the backend
//2.display one question from the backend
//3. know which question currently being displayed
//4. check whether the students answer is correcy or wrong
//5. Move to the next question
//6.Count how many questions are correct
//7. share this information with the components that need it


import {useState, useMemo, useCallback} from "react";
import QuestionContext from "./QuestionContext";

const QuestionProvider = ({children}) => {
   const [questions, setQuestions] = useState([])
   const [activeQuestionId, setActiveQuestionId] = useState(" ");


   // find the active questions
   // id : 1, 1
   const activeQuestion = useMemo(
     () => questions.find((question)=> question._id=== activeQuestionId),
     [activeQuestionId, questions]
   )

   //we know from above which question is active , NOW we need to find its position
   //in array and convert that position into ques number to show the progress like 2/30
   // array index displayed question to the user
    // 0               1
    // 1               2
   const activeQuestionNumber = useMemo(
       () => questions.findIndex((question) => question._id === activeQuestionId) + 1,
       [activeQuestionId,questions]

   )

   const totalQuestions = questions.length

   //mark active question as attempted and save if answer was correct
   // suppose activequestion is 2 and that answer is wrong
   // que 2 gets hasAttempted : true
   //que 2 get isAnswerCorrect: false
   // other question remain unchanged
   
   const updateQuestionStatus = useCallback(
    (isAnswerCorrect) =>{
        setQuestions
        ((prevQuestions)=>
        prevQuestions.map((question) =>
          question._id === activeQuestionId
            ? { ...question, hasAttempted: true, isAnswerCorrect }
            : question )
        )

    },
    [activeQuestionId]

   )

   //move to next question
   const activeNextQuestion = useCallback(()=>{
    const currentIndex = questions.findIndex((question)=> question._id === activeQuestionId)

    if(currentIndex !== -1 && currentIndex +1 < questions.length){
        setActiveQuestionId(questions[currentIndex +1]._id)
    }
   },[activeQuestionId,questions])

// count correct ans
 const correctAnswers = useMemo(
    () => questions.filter((question)=> question.isAnswerCorrect).length,
    [questions]
 )

 // process question rcvd from he API
 //1. save the questions and initialize their answer status
 // select the first question so that the quiz can begin

 const processQuestions = useCallback((questionApiResponse) =>{
    setQuestions(
        questionApiResponse.map((question) =>({
            ...question,
            hasAttempted:false,
            isAnswerCorrect:false
        }))
    );
    setActiveQuestionId(questionApiResponse[0]._id)
 },[])
  
 //prepare data to share with components
 const contextValue = useMemo(
    () =>({
        processQuestions,
        activeNextQuestion,
        activeQuestion,
        activeQuestionNumber,
        totalQuestions,
        correctAnswers,
        updateQuestionStatus

    }),
    [
        processQuestions,
        activeNextQuestion,
        activeQuestion,
        activeQuestionNumber,
        totalQuestions,
        correctAnswers,
        updateQuestionStatus
    ]
 )
   return(
    <QuestionContext.Provider value ={contextValue}>
        {children}
    </QuestionContext.Provider>
 )


}
export default QuestionProvider