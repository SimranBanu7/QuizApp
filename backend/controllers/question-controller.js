//controller : logic

//2 controllers/functions
//get aall questions:

//get questions from mongodb
//pick maximum 30 random questions
//send only the question and options to the frontend
//if something goes wrong send error


//validate answer:
//work with ans is crct or not


const QuestionModel = require("../models/question-model")

const MAX_QUESTION_COUNT = 30

//get all questions

const getQuestions = async (req, res) => {
    try{
        //get all questions from mongodb
        const questions = await QuestionModel.aggregate([
            {$sample: { size: MAX_QUESTION_COUNT }},
            {$project: { question: 1, options: 1 }}

        ])

        res.status(200).json({questions})

    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}


//when user click any option:
//a. in db are u going to vheck option selected by user
//b. first find that question and if found in that option will check

//{
//id: "question_id"
//answer:{
//        id:""
//      value:""
//       }
//}

//req.body => id, answer
//1. Extract data
//2. check if req is valid
//3. check


const validateAnswer = async (req, res) => {
    try{
        //Extract the data from req.body
        const {id, answer} = req.body

        //validate the req
        if(!id || !answer || !answer.id || !answer.value){
            return res.status(400).json({ message: "Invalid request"})
        }

        //check if the question exists in db
        const questionObj = await QuestionModel.findById(id)
        if(!questionObj){
            return res.status(404).json({message: "question not exist"})
        }

        //validate the answer
        //answer selected by user and answer present in db
        //db answer Id === student answer id
        if(questionObj.answer.id === answer.id && 
            questionObj.answer.value === answer.value
        ){
            return res.status(200).json({status: 1, message: "Correct answer"})
        }

        //wrong answer
        //wrong ans is not a server error, so the API successfully executed, but the answer is wrong
        //the result is simply wrong
        return res.status(200).json({status: 0, message: "Wrong answer"})

    }catch(err){
        console.log("Error validating answer:", err)
        res.status(500).json({success:false, message: err.message})
    }
}

module.exports = {getQuestions, validateAnswer};
