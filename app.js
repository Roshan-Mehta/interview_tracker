//requires---------------------------------------
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const programmingRoutes = require('./routes/programming.routes');
const interviewRoutes = require('./routes/interview.routes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const run = require('./admin/connection');
const authController = require('./controllers/authController');
const Quest = require('./models/question');
const {reqAdminAuth} = require('./middleware/authAdmin');
const bodyParser = require('body-parser');


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Admin Bro
const {default : AdminBro} = require('admin-bro');
const buildAdminRouter = require('./admin/admin.router');
const options = require('./admin/admin.options');
const port = 3000;


// view engine
app.set('view engine', 'ejs');

//Database---------------------------------------------------------------------------------
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
  
    const admin = new AdminBro(options)
    const router = buildAdminRouter(admin);
    app.use(admin.options.rootPath, router);
  
};
databaseConnect();

console.log("app in main app : ", app);

// routes----------------------------------------------
app.all('*', checkUser);
app.get('/admin', reqAdminAuth);
app.get('/', (req, res) => res.render('home'));
app.get('/error', (req, res) => res.render('error'));
app.use(authRoutes);
app.use('/programming', programmingRoutes);
app.use(interviewRoutes);



// -----------Image-Processing----------------------------
const imageController = require('./controllers/imageController');
app.use(imageController);


module.exports = app;