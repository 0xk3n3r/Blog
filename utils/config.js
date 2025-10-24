require('dotenv').config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('TEST_MONGODB_URI:', process.env.TEST_MONGODB_URI);
console.log('Using MongoDB URI:', MONGODB_URI);
module.exports = {
  PORT,
  MONGODB_URI
}