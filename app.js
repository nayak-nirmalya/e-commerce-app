const path = require('path')
const bodyParser = require('body-parser')
const errorController = require('./controllers/errors')
const mongoose = require('mongoose')

// const User = require('./models/user')

const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// app.use((req, res, next) => {
//   User.findByID('639ad27737a59d363b90a35f')
//     .then((user) => {
//       req.user = new User(user.username, user.email, user.cart, user._id)
//       next()
//     })
//     .catch((err) => console.error(err))
// })

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

mongoose
  .connect('mongodb+srv://nirmalya:nirmalya@cluster.a9tjk7u.mongodb.net/shop')
  .then((result) => {
    app.listen(3000)
  })
  .catch((err) => console.error(err))
