const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const run = require('./admin/connection');
const authController = require('./controllers/authController');
const Quest = require('./models/question');

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

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("we are connected to database");
  });
  
  // console.log(mongooseDb);
  run(mongooseDb);
  
};
databaseConnect();

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.get('/topics', requireAuth, authController.get_topics);
app.get('/topics/:id', requireAuth, authController.get_question_by_topics);
app.get('/questions/:id', requireAuth, authController.get_question_by_id);
// app.get('/topics/:id', requireAuth, authController.get_question_by_id);
app.use(authRoutes);
