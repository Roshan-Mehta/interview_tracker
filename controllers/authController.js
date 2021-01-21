const User = require("../models/User");
const jwt = require('jsonwebtoken');
const Quest = require('../models/question');
const Topics = require('../models/topics');
const Topic = require("../models/topics");
const { Query } = require("mongoose");
const {isAdmin} = require('../middleware/authAdmin');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.form_get = async (req, res) => {
  const filter = {};
  const all = await Topic.find(filter);
  res.render('forms', {topics : all});
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.form_post = async (req, res) => {
  const {name, topic, link} = req.body;
  const approved = isAdmin(req, res);
  var topicId;
  await Topic.find({name : topic}).then((result) => topicId = result[0]._id);
  console.log("name : ", name, topic, link, approved);
  try {
    const quest = await Quest.create({topic : topicId, name, link, approved});
    res.status(201).json({quest : quest._id});
  }
  catch(err) {
    console.log(err);
    res.status(401).json({err});
  }
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

module.exports.get_topics = (req, res) => {
  Topics.find().then((result) => {res.render('topics', {topics : result})})
  .catch((err) => console.log(err));
}

module.exports.get_question_by_id = (req, res) => {
  // const name = req.params.name;
  const id = req.params.id;
  // console.log("req ", req);
  // console.log(name);
  console.log("id = ", id);
  // console.log(req.params);
  // Quest.find({name : id}).then((result) => {
  //   res.redirect(result.link);
  // }) .catch((error) => console.log(eror));

  Quest.findById(id).then((result) => {
      // res.render('details',{ question : result });
      res.redirect(result.link);
  }) .catch((error) => console.log(error));

}
module.exports.get_question_by_name = (req, res) => {
  const name = req.params.name;
  let id;
  console.log("name ," ,name);
  Quest.find({name : name}).then((result) => {
    res.redirect(result[0].link);
  })
  // Quest.find({topic : name}).then((result) => {
  //   res.render('all_questions', {questions : result});
  // }).catch((error) => console.log(error));
}
module.exports.get_question_by_topics = (req, res) => {
  const id = req.params.id;
  // console.log(id);
  Quest.find({topic : id}).then((result) => res.render('all_questions', {questions : result}))
  .catch((error) => console.log(error));
  // Quest.find({name : 'Array Sum'}).then((result) => console.log("result : ", result));
  // Quest.find({topic : id}).then((result) => console.log("Abe ab kyu nahi aa rha ", result, id));

}
module.exports.get_question_by_topicsName = async (req, res) => {
  const id = req.params.id;
  console.log("id = ", id);
  var TopicId = 23, iconName;
  console.log(TopicId);
  await Topic.find({name : id}).then((result) =>  {TopicId = result[0]._id; iconName = result[0].iconName});
  console.log("Id = ", TopicId);
  Quest.find({topic : TopicId}).then((result) => {
    console.log("questions : ", result);
    res.render('all_questions', {questions : result, iconName});
  })
  .catch((error) => console.log(error));
  // Quest.find({name : 'Array Sum'}).then((result) => console.log("result : ", result));
  // Quest.find({topic : id}).then((result) => console.log("Abe ab kyu nahi aa rha ", result, id));

}