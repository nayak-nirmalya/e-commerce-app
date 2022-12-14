const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://nirmalya:nirmalya@cluster.a9tjk7u.mongodb.net/shop?retryWrites=true&w=majority',
  )
    .then((client) => {
      console.log('Connected!')
      _db = client.db()
      callback()
    })
    .catch((err) => {
      console.error(err)
      throw err
    })
}

const getDB = () => {
  if (_db) {
    return _db
  }
  throw 'No Database Found!'
}

exports.mongoConnect = mongoConnect
exports.getDB = getDB
