const mongodb = require('mongodb')
const getDB = require('../util/database').getDB

class Product {
  constructor(title, price, description, imageURL, id) {
    this.title = title
    this.price = price
    this.description = description
    this.imageURL = imageURL
    this._id = new mongodb.ObjectId(id)
  }

  save() {
    const db = getDB()
    let dbOp
    if (this._id) {
      // Update
      dbOp = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this })
    } else {
      dbOp = db.collection('products').insertOne(this)
    }
    return dbOp
      .then((result) => {
        console.log(result)
      })
      .catch((err) => console.error(err))
  }

  static fetchAll() {
    const db = getDB()
    return db
      .collection('products')
      .find()
      .toArray()
      .then((products) => {
        console.log(products)
        return products
      })
      .catch((err) => console.error(err))
  }

  static findByID(prodID) {
    const db = getDB()
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectId(prodID) })
      .next()
      .then((product) => {
        console.log(product)
        return product
      })
      .catch((err) => console.error(err))
  }
}

module.exports = Product
