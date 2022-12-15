const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productID: { type: Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
})

module.exports = mongoose.model('User', userSchema)

// const mongodb = require('mongodb')
// const getDB = require('../util/database').getDB

// const ObjectId = mongodb.ObjectId

// class User {
//   constructor(username, email, cart, id) {
//     this.username = username
//     this.email = email
//     this.cart = cart
//     this._id = id
//   }

//   save() {
//     const db = getDB()
//     return db.collection('users').insertOne(this)
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex((cp) => {
//       return cp.productID.toString() === product._id.toString()
//     })
//     let newQuantity = 1
//     const updatedCartItems = [...this.cart.items]

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1
//       updatedCartItems[cartProductIndex].quantity = newQuantity
//     } else {
//       updatedCartItems.push({
//         productID: new ObjectId(product._id),
//         quantity: newQuantity,
//       })
//     }
//     const updatedCart = {
//       items: updatedCartItems,
//     }
//     const db = getDB()
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: updatedCart } },
//       )
//   }

//   getCart() {
//     const db = getDB()
//     const prodIDs = this.cart.items.map((temp) => {
//       return temp.productID
//     })
//     return db
//       .collection('products')
//       .find({ _id: { $in: prodIDs } })
//       .toArray()
//       .then((prods) => {
//         return prods.map((prod) => {
//           return {
//             ...prod,
//             quantity: this.cart.items.find((index) => {
//               return index.productID.toString() === prod._id.toString()
//             }).quantity,
//           }
//         })
//       })
//   }

//   deleteItemFromCart(prodID) {
//     const updatedCartItems = this.cart.items.filter((item) => {
//       return item.productID.toString() !== prodID.toString()
//     })
//     const db = getDB()
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItems } } },
//       )
//   }

//   addOrder() {
//     const db = getDB()
//     return this.getCart()
//       .then((products) => {
//         const order = {
//           items: products,
//           user: {
//             _id: new ObjectId(this._id),
//             username: this.username,
//             email: this.email,
//           },
//         }
//         return db.collection('orders').insertOne(order)
//       })
//       .then((result) => {
//         this.cart = { items: [] }
//         return db
//           .collection('users')
//           .updateOne(
//             { _id: new ObjectId(this._id) },
//             { $set: { cart: { items: [] } } },
//           )
//       })
//   }

//   getOrders() {
//     const db = getDB()
//     return db
//       .collection('orders')
//       .find({
//         'user._id': new ObjectId(this._id),
//       })
//       .toArray()
//   }

//   static findByID(userID) {
//     const db = getDB()
//     return db
//       .collection('users')
//       .findOne({ _id: new ObjectId(userID) })
//       .then((user) => {
//         console.log(user)
//         return user
//       })
//       .catch((err) => {
//         console.error(err)
//       })
//   }
// }

// module.exports = User
