const db = require('../util/database')

const Cart = require('./cart')

module.exports = class Product {
  constructor(_id, _title, _imageURL, _price, _description) {
    this.id = _id
    this.title = _title
    this.imageURL = _imageURL
    this.price = _price
    this.description = _description
  }

  save() {
    return db.execute(
      `INSERT INTO products (title, imageURL, price, description) VALUES (?, ?, ?, ?)`,
      [this.title, this.imageURL, this.price, this.description],
    )
  }

  static deleteByID(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM products')
  }

  static findByID(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
  }
}
