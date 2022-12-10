const fs = require('fs')
const path = require('path')

const savePath = path.join(
  path.dirname(__filename),
  '..',
  'data',
  'products.json',
)

const getProductFromFile = (cb) => {
  fs.readFile(savePath, (err, fileContent) => {
    if (err) {
      return cb([])
    }
    cb(JSON.parse(fileContent))
  })
}

module.exports = class Product {
  constructor(_title) {
    this.title = _title
  }

  save() {
    getProductFromFile((products) => {
      products.push(this)
      fs.writeFile(savePath, JSON.stringify(products), (err) => {
        console.log(err)
      })
    })
  }

  static fetchAll(cb) {
    getProductFromFile(cb)
  }
}
