const mongodb = require('mongodb')
const getDB = require('../util/database').getDB

const ObjectId = mongodb.ObjectId

class User {
  constructor(username, email, id) {
    this.username = username
    this.email = email
    this._id = id ? new mongodb.ObjectId(id) : null
  }

  save() {
    const db = getDB()
    return db.collection('users').insertOne(this)
  }

  static findByID(userID) {
    const db = getDB()
    return db
      .collection('users')
      .findOne({ _id: new ObjectId(userID) })
      .then((user) => {
        console.log(user)
        return user
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

module.exports = User
