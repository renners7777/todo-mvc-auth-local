const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', TodoSchema)

//Mongoose helps us create all of our documents. Documents are objects. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection. Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. 
