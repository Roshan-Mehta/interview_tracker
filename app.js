const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const run = require('./admin/connection');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://roshan:roshan123@nodetuts.ouzew.mongodb.net/node-auth';
const url = 'mongodb://localhost:27017/MyProject';
let mongooseDb;
const databaseConnect = async () => {
  mongooseDb = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
  // console.log(mongooseDb);
  run(mongooseDb);
  
};
databaseConnect();

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);
