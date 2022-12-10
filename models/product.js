const products = []

module.exports = class Product {
  constructor(_title) {
    this.title = _title
  }

  save() {
    products.push(this)
  }

  static fetchAll() {
    return products
  }
}
