require('dotenv').config()

const mongoose = require('mongoose')

/*
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
*/

if (process.argv.length>4) {
  console.log('too many arguments')
  process.exit(1)
}
if (process.argv.length===3) {
  console.log('give both name and number')
  process.exit(1)
}

//const password = process.argv[1]
const newName = process.argv[2]
const newNumber = process.argv[3]

//const url = `mongodb+srv://jkemppainen:${password}@jkcluster0.q4kt7z0.mongodb.net/?retryWrites=true&w=majority`
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 2) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
else {
  const person = new Person({
    name: newName,
    number: newNumber,
  })

  person.save().then(() => {
    console.log(`added ${newName} number ${newNumber} to phonebook`)
    mongoose.connection.close()
  })

}
