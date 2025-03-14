const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
  
}

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = process.env.MONGODB_URI

console.log('connecting to', url)


mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

//removing extra fields that comes with mongoose
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)