const mongodb = require('mongodb')
const getDB = require('../util/database').getDB

const ObjectId = mongodb.ObjectId

class User {
  constructor(username, email, cart, id) {
    this.username = username
    this.email = email
    this.cart = cart
    this._id = id
  }

  save() {
    const db = getDB()
    return db.collection('users').insertOne(this)
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productID.toString() === product._id.toString()
    })
    let newQuantity = 1
    const updatedCartItems = [...this.cart.items]

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1
      updatedCartItems[cartProductIndex].quantity = newQuantity
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      })
    }
    const updatedCart = {
      items: updatedCartItems,
    }
    const db = getDB()
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } },
      )
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
