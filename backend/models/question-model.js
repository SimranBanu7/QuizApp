//schema/ structure of the question model
//Import mongoose
//define schema
// question : string,
// options : array of objects,[{id,value}]
//1: Mango 2: Banana 3: Orange 4: Grapes
//answer : object{id,value}
// export the model

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
      
     question: String,
        options: [{id: Number, value: String}],
        answer: {id: Number, value: String}

})

module.exports = mongoose.models?.Qyestion ||mongoose.model("Question", questionSchema)
//questions