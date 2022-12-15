const path = require('path')
const bodyParser = require('body-parser')
const errorController = require('./controllers/errors')
const mongoose = require('mongoose')

const User = require('./models/user')

const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  User.findById('639b35a1ac1945d38ce10215')
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => console.error(err))
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

mongoose
  .connect('mongodb+srv://nirmalya:nirmalya@cluster.a9tjk7u.mongodb.net/shop')
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Nirmalya',
          email: 'nirmalya@nayak.com',
          cart: {
            items: [],
          },
        })
        user.save()
      }
    })

    app.listen(3000)
  })
  .catch((err) => console.error(err))
