const getDB = require('../util/database').getDB

class Product {
  constructor(title, price, description, imageURL) {
    this.title = title
    this.price = price
    this.description = description
    this.imageURL = imageURL
  }

  save() {
    const db = getDB()
    return db
      .collection('products')
      .insertOne(this)
      .then((result) => {
        console.log(result)
      })
      .catch((err) => console.error(err))
  }
}

module.exports = Product
